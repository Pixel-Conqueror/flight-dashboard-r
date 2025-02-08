import { ElementType, useState } from "react";
import {
  TbAuth2Fa,
  TbBellRinging,
  TbDatabaseImport,
  TbFingerprint,
  TbKey,
  TbReceipt2,
  TbSettings,
} from "react-icons/tb";
import classes from "./navbar.module.css";

type Tab = {
  link: string;
  label: string;
  icon: ElementType;
};

const tabs: Array<Tab> = [
  { link: "", label: "Notifications", icon: TbBellRinging },
  { link: "", label: "Billing", icon: TbReceipt2 },
  { link: "", label: "Security", icon: TbFingerprint },
  { link: "", label: "SSH Keys", icon: TbKey },
  { link: "", label: "Databases", icon: TbDatabaseImport },
  { link: "", label: "Authentication", icon: TbAuth2Fa },
  { link: "", label: "Other Settings", icon: TbSettings },
];

export function Navbar() {
  const [active, setActive] = useState("Billing");

  const links = tabs.map((tab) => (
    <a
      className={classes.link}
      data-active={tab.label === active || undefined}
      href={tab.link}
      key={tab.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(tab.label);
      }}
    >
      <tab.icon className={classes.linkIcon} />
      <span>{tab.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
