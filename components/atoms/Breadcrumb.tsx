import Link from "next/link";
import {Breadcrumbs, Typography} from "@mui/material";

interface Props {
  breadcrumbList: {
    name: string;
    isLink: boolean;
    link?: string;
  }[];
}

export default function Breadcrumb({ breadcrumbList }: Props) {
  return (
    <Breadcrumbs>
      {breadcrumbList.map((item, index) => {
        return (
          <>
            {item.isLink ? (
              <Link key={index} href={item.link || ""} className={'no-underline'}>
                <span className={"text-blue-500"}>{item.name}</span>
              </Link>
            ) : (
                <Typography key={index} color="text.primary">{ item.name}</Typography>
            )}
          </>
        );
      })}
    </Breadcrumbs>
  );
}
