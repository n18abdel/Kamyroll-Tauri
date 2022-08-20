<template>
  <nav>
    <div class="erc-header">
    <div class="max-w-8xl">
      <div class="relative flex items-center justify-between h-16">
        
        <!-- <div class="erc-nav-header-item">
                <div class="wrapper">
                  <div tabindex="0" class="nav-item-clickable"></div><a tabindex="0" class="item-logo"
                    href="/crunchyroll">
                    <div class="c-circle-icon c-circle-icon--size-small channel-icon"
                      style="background-color: rgb(244, 117, 33);"><img class="c-circle-icon__element"
                        src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                        alt="Crunchyroll"></div>
                  </a>
                  <div class="item-info">
                    <p class="item-type">Channel</p>
                    <h1 class="item-title">Crunchyroll</h1>
                  </div>
                  <div class="arrows-up-down"><svg class="arrows-icon" xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 12 16" data-t="arrows-up-down-svg">
                      <path d="M6,0l5.6,5.6H.4ZM6,16,.4,10.4H11.6Z"></path>
                    </svg></div>
                </div>
                <div class="erc-nav-dropdown">
                  <div class="nav-dropdown-scrollable">
                    <div class="erc-nav-dropdown-item erc-nav-dropdown-vrv-item"><a class="erc-nav-dropdown-item-link"
                        tabindex="0" href="/">
                        <div class="logo"><svg class="home-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"
                            data-t="home-svg">
                            <polygon
                              points="8.009 0.002 0.009 4.802 0.009 16.002 5.875 16.002 5.875 10.669 10.142 10.669 10.142 16.002 16.009 16.002 16.009 4.802 8.009 0.002">
                            </polygon>
                          </svg></div>
                        <div class="info">
                          <h3 class="title">Vrv Home</h3>
                          <p class="description">All of VRV</p>
                        </div>
                      </a><a class="erc-nav-dropdown-item-browse-link state-hidden-desktop" tabindex="0"
                        href="/browse"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          data-t="view-all-svg">
                          <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                        </svg></a><a class="erc-nav-dropdown-item-browse-link state-hidden-mobile" tabindex="0"
                        href="/browse"><svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          data-t="view-all-svg">
                          <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                        </svg></a></div>
                    <div class="nav-dropdown-channels">
                      <h4 class="nav-dropdown-title">Channels</h4>
                      <div class="erc-nav-dropdown-item"><a aria-current="page"
                          class="erc-nav-dropdown-item-link state-active" tabindex="0" href="/crunchyroll"
                          style="color: rgb(244, 117, 33);">
                          <div class="c-circle-icon c-circle-icon--size-small"
                            style="background-color: rgb(244, 117, 33);"><img class="c-circle-icon__element"
                              src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/crunchyroll/2f608375a63408fd2a808049ebe1177d.png"
                              alt="Crunchyroll"></div>
                          <div class="info">
                            <h3 class="title">Crunchyroll</h3>
                            <p class="description">World's Largest Anime Collection</p>
                          </div>
                        </a><a class="erc-nav-dropdown-item-browse-link state-hidden-desktop" tabindex="0"
                          href="/crunchyroll/browse" style="color: rgb(244, 117, 33);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a><a class="erc-nav-dropdown-item-browse-link state-hidden-mobile" tabindex="0"
                          href="/crunchyroll/browse" style="color: rgb(244, 117, 33);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a></div>
                      <div class="erc-nav-dropdown-item"><a class="erc-nav-dropdown-item-link" tabindex="0"
                          href="/mondo" style="color: rgb(233, 55, 53);">
                          <div class="c-circle-icon c-circle-icon--size-small"
                            style="background-color: rgb(233, 55, 53);"><img class="c-circle-icon__element"
                              src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/mondo/e4e43ea71ac360a96d36ef760883559a.png"
                              alt="Mondo"></div>
                          <div class="info">
                            <h3 class="title">Mondo</h3>
                            <p class="description">Extreme animation</p>
                          </div>
                        </a><a class="erc-nav-dropdown-item-browse-link state-hidden-desktop" tabindex="0"
                          href="/mondo/browse" style="color: rgb(233, 55, 53);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a><a class="erc-nav-dropdown-item-browse-link state-hidden-mobile" tabindex="0"
                          href="/mondo/browse" style="color: rgb(233, 55, 53);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a></div>
                      <div class="erc-nav-dropdown-item"><a class="erc-nav-dropdown-item-link" tabindex="0"
                          href="/vrvselect" style="color: rgb(128, 130, 133);">
                          <div class="c-circle-icon c-circle-icon--size-small"
                            style="background-color: rgb(128, 130, 133);"><img class="c-circle-icon__element"
                              src="https://beta.crunchyroll.com/imgsrv/display/thumbnail/92x92/catalog/vrvselect/495617604205faf4ef10affdecf12006.png"
                              alt="VRV Select"></div>
                          <div class="info">
                            <h3 class="title">VRV Select</h3>
                            <p class="description">Discover VRV's next big thing</p>
                          </div>
                        </a><a class="erc-nav-dropdown-item-browse-link state-hidden-desktop" tabindex="0"
                          href="/vrvselect/browse" style="color: rgb(128, 130, 133);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a><a class="erc-nav-dropdown-item-browse-link state-hidden-mobile" tabindex="0"
                          href="/vrvselect/browse" style="color: rgb(128, 130, 133);"><svg class="icon"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" data-t="view-all-svg">
                            <path d="M6,9V4H9V9Zm5,0V4h3V9ZM6,16V11H9v5Zm5,0V11h3v5Z"></path>
                          </svg></a></div>
                    </div>
                  </div>
                </div>
        </div>
         -->
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex-shrink-0 flex items-center">
            <a href='#'>
              <img class="lg:block h-8 w-auto " src="/src/assets/kamyroll_logo.svg" alt="Kamyroll">
            </a>
          </div>
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a href="/"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
              <a href="/search"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Recherche</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>

    <div class="sm:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a href="/"
          class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Accueil</a>
        <a href="#"
          class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Recherche</a>
      </div>
    </div>
  </nav>
</template>