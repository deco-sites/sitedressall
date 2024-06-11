import { HTMLWidget } from "apps/admin/widgets.ts";

interface InformativoComBotãoProps {
    title: HTMLWidget
    subtitle: string
    ctaLabel: string
    ctaUrl: string
}

const InformativoComBotão = ({ ctaLabel, ctaUrl, subtitle, title }: InformativoComBotãoProps) => {
    return (
        <div class="px-4 py-8 flex flex-col justify-center items-center bg-[#F1F1F1] rounded-[20px] px-4 mt-4 mb-8">
            <h3 class="text-center text-3xl mb-3" dangerouslySetInnerHTML={{ __html: title }} />
            <p class="text-center text-base mb-2">{subtitle}</p>
            <a class="block w-fit bg-[#FE8330] rounded-[30px] text-white py-3 px-8 text-xl" href={ctaUrl}>{ctaLabel}</a>
        </div>
    )
}

export default InformativoComBotão