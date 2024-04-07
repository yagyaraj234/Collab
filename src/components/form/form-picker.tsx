"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FormErrors } from "./form-errors";
import { unsplashImages } from "@/constant";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] =
    useState<Array<Record<string, any>>>(unsplashImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const results = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (results.status === 200) {
          setImages((results?.response as Array<Record<string, any>>) || []);
        } else {
          console.error("Failed to get images from Unsplash");
        }
      } catch (error) {
        console.error(error);
        setImages(unsplashImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImage(image.id);
            }}
          >
            <input
              type="radio"
              id={id}
              name={id}
              className="hidden"
              checked={selectedImage === image.id}
              disabled={pending}
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
            />
            <Image
              fill
              alt="unsplash image"
              src={image.urls.thumb}
              className="object-cover rounded-sm"
            />
            {selectedImage === image.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black flex items-center justify-center opacity-50">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              target="_blank"
              href={image.links.html}
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate hover:underline text-white bg-black/50 pl-1 "
            >
              {image.user.name || image.user.username}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={"image"} errors={errors} />
    </div>
  );
};
