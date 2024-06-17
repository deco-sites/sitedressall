import SouArtistaFormIsland from "../../islands/Forms/SouArtistaFormIsland.tsx";
import { Secret } from "apps/website/loaders/secret.ts";

interface SouArtistaFormProps {
  accessToken: Secret;
}

const SouArtistaForm = ({ accessToken }: SouArtistaFormProps) => {
  return (
    <div>
      <SouArtistaFormIsland accessToken={accessToken} />
    </div>
  );
};

export default SouArtistaForm;
