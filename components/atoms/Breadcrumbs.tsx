import Link from "next/link";

interface Props {
  breadcrumbList: {
    name: string;
    isLink: boolean;
    link?: string;
  }[];
}

export default function Breadcrumbs({ breadcrumbList }: Props) {
  return (
    <div className={""}>
      {breadcrumbList.map((item, index) => {
        return (
          <div key={index} className={"inline-block"}>
            {item.isLink ? (
              <Link href={item.link || ""}>
                <span className={"text-blue-500"}>{item.name}</span>
              </Link>
            ) : (
              <span>{item.name}</span>
            )}
            {index < breadcrumbList.length - 1 && (
              <span className={"mx-2"}>/</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
