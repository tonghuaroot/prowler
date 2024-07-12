"use client";

import { Icon } from "@iconify/react";
import { Button, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";
import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import {
  ProwlerExtended,
  ProwlerShort,
} from "../../icons/prowler/ProwlerIcons";
import { ThemeSwitch } from "../../ThemeSwitch";
import Sidebar from "./Sidebar";
import { sectionItemsWithTeams } from "./SidebarItems";
import { UserAvatar } from "./UserAvatar";

export const SidebarWrap = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const isCompact = isCollapsed || isMobile;

  useEffect(() => {
    const savedState = localStorage.getItem("isCollapsed");
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState));
    }
    setIsLoaded(true);
  }, []);

  const onToggle = useCallback(() => {
    setIsCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("isCollapsed", JSON.stringify(newState));
      return newState;
    });
  }, []);

  if (!isLoaded) return null;

  return (
    <div
      className={clsx(
        "relative flex h-screen flex-col !border-r-small border-divider  transition-width",
        {
          "w-72 p-6": !isCompact,
          "w-16 items-center px-2 py-6": isCompact,
        },
      )}
    >
      <div
        className={clsx("flex items-center gap-3 px-3", {
          "justify-center gap-0": isCompact,
        })}
      >
        <div
          className={clsx({
            hidden: !isCompact,
          })}
        >
          <ProwlerShort />
        </div>
        <div
          className={clsx({
            hidden: isCompact,
          })}
        >
          <ProwlerExtended />
        </div>
      </div>
      <Spacer y={8} />

      <UserAvatar
        userName={"Pablo Lara"}
        position={"Software Engineer"}
        isCompact={isCompact}
      />

      <ScrollShadow className="-mr-6 h-full max-h-full py-6 pr-6">
        <Sidebar
          defaultSelectedKey="home"
          isCompact={isCompact}
          items={sectionItemsWithTeams}
        />
      </ScrollShadow>
      <Spacer y={2} />
      <div
        className={clsx("mt-auto flex flex-col", {
          "items-center": isCompact,
        })}
      >
        <Tooltip
          content="Help & Feedback"
          isDisabled={!isCompact}
          placement="right"
        >
          <Button
            fullWidth
            className={clsx(
              "justify-start truncate text-default-500 data-[hover=true]:text-foreground",
              {
                "justify-center": isCompact,
              },
            )}
            isIconOnly={isCompact}
            startContent={
              isCompact ? null : (
                <Icon
                  className="flex-none text-default-500"
                  icon="solar:info-circle-line-duotone"
                  width={24}
                />
              )
            }
            variant="light"
          >
            {isCompact ? (
              <Icon
                className="text-default-500"
                icon="solar:info-circle-line-duotone"
                width={24}
              />
            ) : (
              "Help & Information"
            )}
          </Button>
        </Tooltip>
        <Tooltip content="Log Out" isDisabled={!isCompact} placement="right">
          <Button
            className={clsx(
              "justify-start text-default-500 data-[hover=true]:text-foreground",
              {
                "justify-center": isCompact,
              },
            )}
            isIconOnly={isCompact}
            startContent={
              isCompact ? null : (
                <Icon
                  className="flex-none rotate-180 text-default-500"
                  icon="solar:minus-circle-line-duotone"
                  width={24}
                />
              )
            }
            variant="light"
          >
            {isCompact ? (
              <Icon
                className="rotate-180 text-default-500"
                icon="solar:minus-circle-line-duotone"
                width={24}
              />
            ) : (
              "Log Out"
            )}
          </Button>
        </Tooltip>
      </div>
      <div
        className={clsx("mt-auto flex justify-end gap-3 items-baseline", {
          "flex-col items-center": isCompact,
        })}
      >
        <Tooltip
          content="Light | Dark mode"
          placement={isCompact ? "right" : "top"}
        >
          <div
            className={clsx(
              "text-default-500 data-[hover=true]:text-foreground px-0",
              {
                "justify-center mt-3": isCompact,
              },
            )}
          >
            <ThemeSwitch />
          </div>
        </Tooltip>
        <Tooltip
          content="Open | Close sidebar"
          placement={isCompact ? "right" : "top"}
        >
          <Button
            className={clsx(
              "text-default-500 data-[hover=true]:text-foreground px-0",
              {
                "justify-center": isCompact,
              },
            )}
            isIconOnly
            size="sm"
            variant="light"
            onPress={onToggle}
          >
            <Icon
              className="text-default-500"
              height={24}
              icon="solar:sidebar-minimalistic-outline"
              width={24}
            />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};
