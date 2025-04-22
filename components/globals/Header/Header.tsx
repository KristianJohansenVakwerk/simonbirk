import Link from "next/link";
import Menu from "../Menu/Menu";
import Text from "@components/shared/ui/Text/Text";
const titles = [
  "Adidas Magazine",
  "Distance",
  "The Greatest Magazine",
  "Pas Normal Studios aw24",
  "Doxa",
  "Salomon Sportstyle",
  "Salomon S_LAB",
  "Adidas Magazine",
  "Distance",
  "The Greatest Magazine",
  "Pas Normal Studios aw24",
  "Doxa",
  "Salomon Sportstyle",
  "Adidas Magazine",
  "Distance",
  "The Greatest Magazine",
  "Pas Normal Studios aw24",
  "Doxa",
  "Salomon Sportstyle",
  "Adidas Magazine",
  "Distance",
  "The Greatest Magazine",
  "Pas Normal Studios aw24",
  "Doxa",
  "Salomon Sportstyle",
];

const testData = titles.map((title, index) => ({
  title,
  year: "2024",
  img: `/image_${(index % 5) + 1}.jpg`,
}));
const Header = () => {
  return (
    <>
      <header className="grid grid-cols-20 gap-1 min-h-screen mb-[100vh]">
        <Link
          href={"/"}
          className={
            "sticky top-75 flex flex-row justify-center col-span-2  h-fit"
          }
        >
          <Text>Simon Birk</Text>
        </Link>
        <div className={"col-span-6 mt-75"}>
          <Menu data={testData} />
        </div>
        <Text className="sticky top-75 h-fit col-span-3">Photographer</Text>

        <Text className="sticky top-75 h-fit col-span-3 flex flex-row gap-1">
          <span>Agency</span>
          <span>Preview</span>
        </Text>

        <Text className="sticky top-75 h-fit col-span-3 flex flex-row gap-1">
          <span>Email</span>
          <span>info@simonbirk.com</span>
        </Text>

        <Text className="sticky top-75 h-fit col-span-3 flex flex-row gap-1">
          <span>Instagram</span>
          <span>@simonbirk</span>
        </Text>
      </header>
    </>
  );
};

export default Header;
