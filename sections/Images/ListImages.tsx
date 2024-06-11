import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

interface ImageProps {
  src: ImageWidget;
  text: string;
}

interface ListImagesProps {
  images?: ImageProps[];
}

const ListImages = ({ images }: ListImagesProps) => {
  return (
    <div class="flex justify-between flex-wrap">
      {images && images.map((image) => (
        <div class="w-full max-w-[150px]">
          <Image src={image.src} width={150} />
          <p class="text-sm font-bold text-center">{image.text}</p>
        </div>
      ))}
    </div>
  );
};

export default ListImages;
