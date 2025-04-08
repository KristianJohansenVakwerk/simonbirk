"use client";

import Box from "@components/shared/ui/Box/Box";
import Text from "@components/shared/ui/Text/Text";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  year: string;
  index: number;
};

export const MenuItemTexts = (props: Props) => {
  const { title, year, index } = props;

  return (
    <div className="flex flex-col justify-between h-full">
      <MenuItemSticky index={index} className={"self-start"}>
        {year}
      </MenuItemSticky>
      <MenuItemSticky index={index} className={"self-end"}>
        {title}
      </MenuItemSticky>
    </div>
  );
};

export default MenuItemTexts;

const MenuItemSticky = ({
  children,
  className = "",
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const initialPosRef = useRef<number | null>(null);

  useEffect(() => {
    if (ref.current && !initialPosRef.current) {
      initialPosRef.current =
        ref.current.getBoundingClientRect().top + window.scrollY;
    }

    const handleScroll = () => {
      if (ref.current) {
        const scrollPosition = window.scrollY;

        console.log(initialPosRef.current, scrollPosition);
        if (initialPosRef.current)
          setIsSticky(scrollPosition >= initialPosRef?.current - 75);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Text className={clsx(className, isSticky && "sticky")}>{children}</Text>
  );
};
