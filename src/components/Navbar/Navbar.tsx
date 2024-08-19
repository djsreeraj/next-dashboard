"use client"
import { useState } from 'react';
import { Group } from '@mantine/core';
import {
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconUsers,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import Image from 'next/image';
import Logo from '../../../public/logo.svg';

const data = [
  { link: '', label: 'Users', icon: IconUsers },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Other Settings', icon: IconSettings },
];

export function Navbar() {
  const [active, setActive] = useState('Users');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive('Users');
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} mx="lg" justify="space-between">
             <Image src={Logo} alt="Logo" width={150} height={150} />
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}