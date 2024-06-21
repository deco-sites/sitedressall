import Image from "apps/website/components/Image.tsx";
import { Colors } from "../../constants.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Bg {
    bgColor?: Colors;
    bgImage?: ImageWidget;
}

export interface Props {
    label: string;
    image: ImageWidget
    url: string
}

export default function RoundedImageCard({
    label = "Item",
    image,
    url
}: Props) {

    return (
        <div>
            <a href={url} class="">
                <Image
                    src={image}
                    width={115}
                    height={115}
                    alt="image"
                />
                <p class="text-[15px] font-bold text-center mt-2">{label}</p>
            </a>
        </div>
    );
}
