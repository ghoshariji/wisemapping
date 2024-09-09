import React, { useEffect } from "react";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

function CanvasPage() {
  useEffect(() => {
    // Hide the dropdown after the component mounts
    const dropdownMenu = document.querySelector(".dropdown-menu-group");
    if (dropdownMenu) {
      dropdownMenu.style.display = "none";
    }
  }, []);

  return (
    <div className="h-screen w-screen">
      <Excalidraw>
        <MainMenu>
  
          <MainMenu.DefaultItems.LoadScene/>
          <MainMenu.DefaultItems.SaveAsImage/>
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.LiveCollaborationTrigger />

          <MainMenu.DefaultItems.Help />
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Logo>
              <img
                src="https://www.wisemapping.com/_next/static/media/logo-small.3e04aac9.svg"
                alt="Wisemapping Logo"
                className="h-44 w-44"
              />
            </WelcomeScreen.Center.Logo>
            <WelcomeScreen.Center.Heading>
              Welcome to Wisemapping
            </WelcomeScreen.Center.Heading>
            <WelcomeScreen.Center.Menu>
              <WelcomeScreen.Center.MenuItemLink href="https://github.com/Saurabh13042004/wisemapping">
                Contribute on GitHub
              </WelcomeScreen.Center.MenuItemLink>
              <WelcomeScreen.Center.MenuItemHelp />
            </WelcomeScreen.Center.Menu>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
}

export default CanvasPage;
