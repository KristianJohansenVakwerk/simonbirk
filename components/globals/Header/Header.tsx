import Link from "next/link";
import Menu from "../Menu/Menu";
import Text from "@components/shared/ui/Text/Text";
const testData = [
  {
    title: "Adidas Magazine",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "Distance",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "The Greatest Magazine",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "Pas Normal Studios aw24",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "Doxa",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "Salomon Sportstyle",
    year: "2024",
    img: "/image_1.jpg",
  },
  {
    title: "Salomon S_LAB",
    year: "2024",
    img: "/image_1.jpg",
  },
];

const Header = () => {
  return (
    <header className="grid grid-cols-20 gap-1 pt-5 min-h-screen mb-[100vh]">
      <Link
        href={"/"}
        className={
          "sticky top-5 flex flex-row justify-center col-span-2  h-fit"
        }
      >
        <Text>Simon Birk</Text>
      </Link>
      <div className={"col-span-6"}>
        <Menu data={testData} />
      </div>
      <Text className="sticky top-5 h-fit col-span-3">Photographer</Text>

      <Text className="sticky top-5 h-fit col-span-3 flex-row gap-1">
        <span>Agency</span>
        <span>Preview</span>
      </Text>

      <Text className="sticky top-5 h-fit col-span-3 flex-row gap-1">
        <span>Email</span>
        <span>info@simonbirk.com</span>
      </Text>

      <Text className="sticky top-5 h-fit col-span-3 flex-row gap-1">
        <span>Instagram</span>
        <span>@simonbirk</span>
      </Text>
    </header>
  );
};

export default Header;
