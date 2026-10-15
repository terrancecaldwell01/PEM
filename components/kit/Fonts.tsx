/*
  Load Google Fonts for one site.
  <Fonts families={["Caprasimo", "Karla:wght@400;600;800"]} />
  Plain names load weights 400 to 700 (plus italic 400).
*/
export default function Fonts({ families }: { families: string[] }) {
  const q = families
    .map((f) => {
      const [name, axes] = f.split(":");
      return `family=${name.trim().replace(/ /g, "+")}:${axes ?? "ital,wght@0,400;0,500;0,600;0,700;1,400"}`;
    })
    .join("&");
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${q}&display=swap`} />
    </>
  );
}
