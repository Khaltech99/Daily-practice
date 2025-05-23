import React from "react";
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, Trash, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { fileUploadSchema } from "../schema";
import { Input } from "./components/ui/input";
import { uploadFiletoServer } from "./lib/storage";

function FileUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      file: null,
    },
  });

  const watchedFile = form.watch("file");

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      form.setValue("file", file);
    }
  };

  const removeFile = () => {
    form.setValue("file", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
  };

  const onSubmit = async (data) => {
    if (!data.file) return;
    await simulateUpload();

    try {
      const response = await uploadFiletoServer(data.file);
      if (response.success) {
        toast(<h1>{response.message}</h1>);
      }
    } catch (error) {
      console.log(error);
      toast(
        <div className="space-y-2">
          <h4 className="font-semibold">Upload Failed</h4>
          <p className="text-sm">An error occurred while uploading your file</p>
        </div>
      );
    }
  };

  const simulateUpload = () => {
    return new Promise((resolve) => {
      setUploading(true);
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setUploadComplete(true);
            resolve();
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    });
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const resetUpload = () => {
    form.reset();
    setUploadProgress(0);
    setUploading(false);
    setUploadComplete(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const hasErrors = Object.keys(form.formState.errors).length > 0;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>Upload a single file to our server</CardDescription>
      </CardHeader>
      <CardContent>
        {!uploadComplete ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">File Upload</FormLabel>
                    <FormControl>
                      <div
                        className={cn(
                          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50",
                          hasErrors && "border-destructive bg-destructive/5"
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={onButtonClick}
                      >
                        <Input
                          {...field}
                          ref={fileInputRef}
                          type="file"
                          value=""
                          onChange={(e) => {
                            const file = e.target.files?.[0] || null;
                            field.onChange(file);
                          }}
                          className="hidden"
                          accept="image/svg+xml,image/png,image/jpeg,image/gif"
                          aria-describedby="file-upload-description"
                        />

                        <div className="flex flex-col items-center justify-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="text-sm font-medium mb-1">
                            <span className="text-primary font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <FormDescription id="file-upload-description">
                            SVG, PNG, JPG or GIF (MAX. 2MB)
                          </FormDescription>
                          <Button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onButtonClick();
                            }}
                            variant="outline"
                            className="mt-4"
                            size="sm"
                          >
                            Select File
                          </Button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchedFile && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Selected file:</p>
                  <Card className="overflow-hidden">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-secondary p-2 rounded">
                          <Upload className="h-4 w-4 text-secondary-foreground" />
                        </div>
                        <div className="text-sm truncate max-w-xs">
                          <p className="font-medium truncate">
                            {watchedFile.name}
                          </p>
                          <p className="text-muted-foreground text-xs">
                            {formatFileSize(watchedFile.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={removeFile}
                        size="icon"
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>

                    {uploading && (
                      <div className="px-3 pb-3">
                        <Progress value={uploadProgress} className="h-2" />
                        <div className="text-xs text-right mt-1 text-muted-foreground">
                          {uploadProgress}%
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              )}

              {watchedFile && !uploading && (
                <div className="flex justify-end pt-4">
                  <Button type="submit" disabled={!watchedFile || uploading}>
                    Upload File
                  </Button>
                </div>
              )}
            </form>
          </Form>
        ) : (
          <div className="text-center p-6 bg-primary/5 rounded-lg">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload Complete!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Your file has been successfully uploaded.
            </p>
            <Button type="button" onClick={resetUpload} variant="outline">
              Upload Another File
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default FileUpload;
