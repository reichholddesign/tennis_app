// import NavBarButtons from "./nav-bar-buttons";
// import NavBarTabs from "./nav-bar-tabs";
import Profile from "../../profile";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import LoginButton from "../../buttons/login-button";
import SignupButton from "../../buttons/signup-button";

// const NavBar = () => {

//   return (
//     <>
//       <div
//         style={{ display: "flex", justifyContent: "space-between" }}
//         className="nav-bar__container"
//       >
//         <nav className="nav-bar">
//           <NavBarButtons />
//           <NavBarTabs />
//         </nav>
//         {isAuthenticated && <Profile />}
//       </div>
//     </>
//   );
// };

// export default NavBar;

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";

function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isAuthenticated } = useAuth0();
  return (
    <header>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Hit Up Tennis
            </Text>

            <Flex display={{ base: "none", md: "flex" }} ml={10}>
              {isAuthenticated && (
                <nav>
                  <DesktopNav />
                </nav>
              )}
            </Flex>
          </Flex>

          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {isAuthenticated ? (
              <Profile />
            ) : (
              <>
                <LoginButton />
                <SignupButton />
              </>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          {isAuthenticated && (
            <nav>
              <MobileNav />
            </nav>
          )}
        </Collapse>
      </Box>
    </header>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink to={navItem.href ?? "#"}>
                <Box
                  as="a"
                  p={2}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Box>
              </NavLink>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <NavLink to={navItem.href}>
          <MobileNavItem key={navItem.label} {...navItem} />
        </NavLink>
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <Stack spacing={4} onClick={children ? handleToggle : undefined}>
      <Box
        py={2}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <>
                <Box as="a" key={child.label} py={2}>
                  {child.label}
                </Box>
              </>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Profile",
    href: "/profile",
    // children: [
    //   // {
    //   //   label: "Explore Design Work",
    //   //   subLabel: "Trending Design to inspire you",
    //   //   href: "/profile",
    //   // },
    //   // {
    //   //   label: "New & Noteworthy",
    //   //   subLabel: "Up-and-coming Designers",
    //   //   href: "#",
    //   // },
    // ],
  },
  {
    label: "Activity",
    href: "/activity",
  },
  {
    label: "Players",
    href: "/players",
  },
];

export default WithSubnavigation;
