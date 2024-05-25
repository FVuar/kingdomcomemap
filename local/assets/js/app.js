if (localStorage.getItem('lang')) {
    console.warn("lang already exists");
} else {
    localStorage.setItem('lang', 'tr');
}
const sideBar = document.getElementById('sidebar');
let currentLang = localStorage.getItem("lang");
function getMeta() {
    const title = document.querySelector('title');
    title.innerText = get.meta.title[currentLang];

    const description = document.querySelector('meta[name="description"]');
    description.content = get.meta.description[currentLang];

    const author = document.querySelector('meta[name="author"]');
    author.content = get.meta.author[currentLang];

    const html = document.querySelector('html');
    html.lang = currentLang;
}
function goBackup() {
    const liElements = document.querySelectorAll('.sidebar-tabs ul li');
    const siPane = document.querySelectorAll('.sidebar-pane');
    liElements.forEach(li => {
        li.classList.remove('active');
    });
    siPane.forEach(div => {
        div.classList.remove('active');
    });
    if (liElements.length > 0) {
        liElements[liElements.length - 1].classList.add('active');
        siPane[siPane.length - 1].classList.add('active');
    }
}
function GetTablist(name, lang) {
    return get.tablist[name][lang];
}
function GetFlag(parent, lang) {
    let icon;
    switch (lang) {
        case 'tr':
            icon = "<svg onclick='goBackup()' style='cursor: pointer;' xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 512 512\"><mask id=\"a\"><circle cx=\"256\" cy=\"256\" r=\"256\" fill=\"#fff\"/></mask><g mask=\"url(#a)\"><path fill=\"#d80027\" d=\"M0 0h512v512H0z\"/><g fill=\"#eee\"><path d=\"m350 182 33 46 54-18-33 46 33 46-54-18-33 46v-57l-54-17 54-18v-56Z\"/><path d=\"M260 370a114 114 0 1 1 54-215 141 141 0 1 0 0 202c-17 9-35 13-54 13Z\"/></g></g></svg>";
            break;
        case 'en':
            icon = "<svg onclick='goBackup()' style='cursor: pointer;' xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 512 512\"><mask id=\"a\"><circle cx=\"256\" cy=\"256\" r=\"256\" fill=\"#fff\"/></mask><g mask=\"url(#a)\"><path fill=\"#eee\" d=\"m0 0 8 22-8 23v23l32 54-32 54v32l32 48-32 48v32l32 54-32 54v68l22-8 23 8h23l54-32 54 32h32l48-32 48 32h32l54-32 54 32h68l-8-22 8-23v-23l-32-54 32-54v-32l-32-48 32-48v-32l-32-54 32-54V0l-22 8-23-8h-23l-54 32-54-32h-32l-48 32-48-32h-32l-54 32L68 0H0z\"/><path fill=\"#0052b4\" d=\"M336 0v108L444 0Zm176 68L404 176h108zM0 176h108L0 68ZM68 0l108 108V0Zm108 512V404L68 512ZM0 444l108-108H0Zm512-108H404l108 108Zm-68 176L336 404v108z\"/><path fill=\"#d80027\" d=\"M0 0v45l131 131h45L0 0zm208 0v208H0v96h208v208h96V304h208v-96H304V0h-96zm259 0L336 131v45L512 0h-45zM176 336 0 512h45l131-131v-45zm160 0 176 176v-45L381 336h-45z\"/></g></svg>";
            break;
    }
    parent.innerHTML += icon;
}
let cez = {
    tablist: [
        {href: "#home", title: GetTablist("home", currentLang), icon: "home"},
        {href: "#share", title: GetTablist("share", currentLang), icon: "share"},
        {href: "#about", title: GetTablist("about", currentLang), icon: "about"},
        {href: "#backup", title: GetTablist("backup", currentLang), icon: "inventory"}
    ],
    version: "1.3.1",
    languages: [localStorage.getItem('lang') === "en" ? "en" : "tr", localStorage.getItem('lang') === "en" ? "tr" : "en"]
}

function getSideBarTabs() {
    const sideBarTabs = document.createElement('div');
    sideBarTabs.classList.add('sidebar-tabs');

    const ul = document.createElement('ul'),
        ul2 = document.createElement('ul');

    ul.role = "tablist";
    sideBarTabs.appendChild(ul);

    GetFlag(ul, localStorage.getItem('lang'));

    cez.tablist.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${item.href}" role="tab" title="${item.title}"><i class="${item.icon}"></i></a>`;
        ul.appendChild(li);
    })
    sideBar.appendChild(sideBarTabs);
}
function getSideBarContent() {
    let sideBarContent = document.createElement('div');
    sideBarContent.classList.add('sidebar-content');

    function sideBarClose(parent) {
        const sideBarClose = document.createElement('span');
        sideBarClose.classList.add('sidebar-close');
        parent.appendChild(sideBarClose);

        const iconLeftArrow = document.createElement('i');
        iconLeftArrow.classList.add('left-arrow');
        sideBarClose.appendChild(iconLeftArrow);
    }
    function getListTitle(parent, i18n, text) {
        const listTitle = document.createElement('p');
        listTitle.classList.add('list-title');
        listTitle.dataset.i18n = i18n;
        listTitle.innerText = text;
        parent.appendChild(listTitle);
    }

    function getHome() {
        // Side Bar Close
        const sideBarPanel = document.createElement('div');
        sideBarPanel.classList.add('sidebar-pane');
        sideBarPanel.id = "home";
        sideBarContent.appendChild(sideBarPanel);

        sideBarClose(sideBarPanel);

        // Side Bar Logo Container
        const logoContainer = document.createElement('div');
        logoContainer.classList.add('logo-container');
        sideBarPanel.appendChild(logoContainer);

        const logoMenu = document.createElement('img');
        logoMenu.classList.add('logo-menu');
        logoMenu.src = "https://kingdomcomemap.github.io/assets/images/kcdmap.svg";
        logoMenu.alt = "Kingdom Come Deliverance için İnteraktif Harita";
        logoContainer.appendChild(logoMenu);

        getVersion(logoContainer);

        // Side Bar Content
        const content = document.createElement('div');
        content.classList.add('content');
        sideBarPanel.appendChild(content);

        function getVersion(parent) {
            const version = document.createElement('p');
            version.classList.add('version');
            version.innerText = 'v. '+cez.version;
            parent.appendChild(version);
        }
        function getUserListMarkers() {
            // content>userList
            const userList = document.createElement('ul');
            userList.classList.add('user-list');
            content.appendChild(userList);

            // content>userList>li
            const li = document.createElement('li');
            userList.appendChild(li);

            // content>userList>li>i
            const usrLstIcon = document.createElement('i');
            usrLstIcon.classList.add(get.markers.my_markers.icon);
            li.appendChild(usrLstIcon);

            // content>userList>li>input
            const userMakers = document.createElement('input');
            userMakers.type = "checkbox";
            userMakers.id = get.markers.my_markers.id;
            userMakers.classList.add('cc');
            userMakers.checked = true;
            li.appendChild(userMakers);

            // content>userList>li>label
            const userLabel = document.createElement('label');
            userLabel.htmlFor = userMakers.id;
            userLabel.classList.add('cl');
            userLabel.dataset.i18n = get.markers.my_markers.i18n;
            userLabel.innerText = get.markers.my_markers[currentLang];
            li.appendChild(userLabel);
        }
        function getAllMarkersChoice() {
            // content>allMarkersList
            const allMarkersList = document.createElement('ul');
            allMarkersList.classList.add('allmarkers-list');
            content.appendChild(allMarkersList);

            const li2 = document.createElement('li');
            allMarkersList.appendChild(li2);

            // content>userList>li>i
            const Icon = document.createElement('i');
            Icon.classList.add(get.markers.all_markers.icon);
            li2.appendChild(Icon);

            // content>userList>li>input
            const allMarkers = document.createElement('input');
            allMarkers.type = "checkbox";
            allMarkers.id = get.markers.all_markers.id;
            allMarkers.classList.add('cc');
            allMarkers.checked = false;
            li2.appendChild(allMarkers);

            // content>userList>li>label
            const alLabel = document.createElement('label');
            alLabel.htmlFor = allMarkers.id;
            alLabel.classList.add('cl');
            alLabel.dataset.i18n = get.markers.all_markers.i18n;
            alLabel.innerText = get.markers.all_markers[currentLang];
            li2.appendChild(alLabel);
        }
        function getMarkers() {
            // content>markersList
            const markersList = document.createElement('ul');
            markersList.classList.add('markers-list');
            content.appendChild(markersList);

            let index = 0;
            for (let key in get.markers) {
                if (get.markers.hasOwnProperty(key)) {
                    index++;
                    if (index > 2) {
                        // Create a list item
                        const li = document.createElement('li');

                        // Create the icon element
                        const icon = document.createElement('i');
                        icon.className = get.markers[key].icon; // Add the class based on the key
                        li.appendChild(icon);

                        // Create the checkbox element
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = get.markers[key].id;
                        checkbox.className = 'cc';
                        checkbox.checked = false;
                        li.appendChild(checkbox);

                        // Create the label element
                        const label = document.createElement('label');
                        label.htmlFor = checkbox.id;
                        label.className = 'cl';
                        label.dataset.i18n = get.markers[key].i18n;
                        label.innerText = get.markers[key][currentLang]; // Set the text content to the value
                        li.appendChild(label);

                        // Append the list item to the marker list
                        markersList.appendChild(li);
                    }
                }
            }
        }

        getUserListMarkers();
        getAllMarkersChoice();
        getMarkers();
    }
    function getShare() {
        // share panel
        const sideBarPanel = document.createElement('div');
        sideBarPanel.classList.add('sidebar-pane');
        sideBarPanel.id = get.tablist.share.id;
        sideBarContent.appendChild(sideBarPanel);

        sideBarClose(sideBarPanel);
        getListTitle(sideBarPanel, "send_markers", get.panel.share.main_title[currentLang]);

        const content = document.createElement('div');
        content.classList.add('content');
        sideBarPanel.appendChild(content);

        const textDiscord = document.createElement('p');
        textDiscord.classList.add('text');
        textDiscord.innerText = get.panel.share.send_discord[currentLang];
        content.appendChild(textDiscord);

        const textDiscordLink = document.createElement('a');
        textDiscordLink.href = "https://discord.gg/7rvUxAC";
        content.appendChild(textDiscordLink);

        const textDiscordLinkImage = document.createElement('img');
        textDiscordLinkImage.classList.add('discord-img');
        textDiscordLinkImage.src = "https://kingdomcomemap.github.io/assets/images/discord-dark.svg";
        textDiscordLinkImage.alt = "Discord";
        textDiscordLink.appendChild(textDiscordLinkImage);

        const textReddit = document.createElement('p');
        textReddit.classList.add('text');
        textReddit.innerText = get.panel.share.send_reddit[currentLang];
        content.appendChild(textReddit);

        const textRedditLink = document.createElement('a');
        textRedditLink.href = "https://www.reddit.com/r/kingdomcome/comments/81aaov/interactive_map_live/";
        content.appendChild(textRedditLink);

        const textRedditLinkImage = document.createElement('img');
        textRedditLinkImage.classList.add('discord-img');
        textRedditLinkImage.src = "https://kingdomcomemap.github.io/assets/images/reddit.svg";
        textRedditLinkImage.alt = "Discord";
        textRedditLink.appendChild(textRedditLinkImage);
    }
    function getAbout() {
        // about panel
        const sideBarPanel = document.createElement('div');
        sideBarPanel.classList.add('sidebar-pane');
        sideBarPanel.id = "about";
        sideBarContent.appendChild(sideBarPanel);

        sideBarClose(sideBarPanel);

        function getTitle(parent, text, date) {
            const updateTitle = document.createElement('h3');
            updateTitle.innerText = text;
            parent.appendChild(updateTitle);

            const updateDay = document.createElement('span');
            updateDay.classList.add('updateday');
            updateDay.innerText = date;
            parent.appendChild(updateDay);
        }
        function getUpdateList(parent, version) {
            const updateList = document.createElement('ul');
            updateList.classList.add('update-list');
            parent.appendChild(updateList);

            const notes = get.panel.about[version].notes;
            for (let key in notes) {
                if (notes.hasOwnProperty(key)) {
                    const listItem = document.createElement('li');
                    listItem.innerText = notes[key][currentLang];
                    listItem.classList.add('text');
                    updateList.appendChild(listItem);
                }
            }
        }
        function getUpdate() {
            getTitle(contentUpdate, get.panel.about["v1.3.1"].title[currentLang], get.panel.about["v1.3.1"].release_date);
            getUpdateList(contentUpdate, "v1.3.1");
            getTitle(contentUpdate, get.panel.about["v1.3"].title[currentLang], get.panel.about["v1.3"].release_date);
            getUpdateList(contentUpdate, "v1.3");
            getTitle(contentUpdate, get.panel.about["v1.2"].title[currentLang], get.panel.about["v1.2"].release_date);
            getUpdateList(contentUpdate, "v1.2");
            getTitle(contentUpdate, get.panel.about["v1.0"].title[currentLang], get.panel.about["v1.0"].release_date);
            getUpdateList(contentUpdate, "v1.0");
        }
        function getText(parent, type, text, htmlTYPE) {
            const element = document.createElement(htmlTYPE);
            element.innerHTML = text;
            switch (type) {
                case 'text creator':
                    element.classList.add('text','creator');
                    break;
                default:
                    element.classList.add('text');
            }
            parent.appendChild(element);
        }
        function getLegalInfo() {
            const legalInfo = document.createElement('div');
            legalInfo.classList.add('legalinfo');
            contentUpdate.appendChild(legalInfo);

            getText(legalInfo, 'text creator', get.panel.about.creadits.main_title[currentLang] , 'p');
            getText(legalInfo, 'text creator', get.panel.about.creadits.author[currentLang], 'p');
            getText(legalInfo, 'text', get.panel.about.creadits.thanks["0"][currentLang], 'p');
            getText(legalInfo, 'text', get.panel.about.creadits.thanks["1"][currentLang], 'p');
            getText(legalInfo, 'text', get.panel.about.creadits.translator[currentLang], 'p');
            getText(legalInfo, 'text', get.panel.about.creadits.copyright[currentLang], 'p');
        }

        getListTitle(sideBarPanel, "info", get.panel.about.main_title[currentLang]);

        const contentUpdate = document.createElement('div');
        contentUpdate.classList.add('content','update');
        sideBarPanel.appendChild(contentUpdate);

        getUpdate();
        getLegalInfo();

    }
    function getBackup() {
        // backup panel
        const sideBarPanel = document.createElement('div');
        sideBarPanel.classList.add('sidebar-pane');
        sideBarPanel.id = "backup";
        sideBarContent.appendChild(sideBarPanel);

        sideBarClose(sideBarPanel);
        getListTitle(sideBarPanel, "ImportExportmarkers", get.panel.backup.main_title[currentLang]);

        const content = document.createElement('div');
        content.classList.add('content', 'mtop15px');
        sideBarPanel.appendChild(content);

        const btnBackUpls = document.createElement('a');
        btnBackUpls.classList.add('btn','backupls');
        btnBackUpls.href = "#";
        content.appendChild(btnBackUpls);

        const IconExport = document.createElement('i');
        IconExport.classList.add('export');
        btnBackUpls.appendChild(IconExport);

        const btnExport = document.createElement('span');
        btnExport.classList.add('btn-text');
        btnExport.innerText = get.panel.backup.btn_export[currentLang];
        btnBackUpls.appendChild(btnExport);

        const btnRestorels = document.createElement('a');
        btnRestorels.classList.add('btn','restorels');
        btnRestorels.href = "#";
        content.appendChild(btnRestorels);

        const IconImport = document.createElement('i');
        IconImport.classList.add('import');
        btnRestorels.appendChild(IconImport);

        const btnImport = document.createElement('span');
        btnImport.classList.add('btn-text');
        btnImport.innerText = get.panel.backup.btn_import[currentLang];
        btnRestorels.appendChild(btnImport);


        const dialog = document.createElement('div');
        dialog.classList.add('dialog');
        content.appendChild(dialog);

        const btnClearls = document.createElement('a');
        btnClearls.classList.add('btn','clearls');
        btnClearls.href = "#";
        dialog.appendChild(btnClearls);

        const IconClear = document.createElement('i');
        IconClear.classList.add('erase');
        btnClearls.appendChild(IconClear);

        const btnClear = document.createElement('span');
        btnClear.classList.add('btn-text');
        btnClear.innerText = get.panel.backup.btn_clear[currentLang];
        btnClearls.appendChild(btnClear);

        const prompt = document.createElement('div');
        prompt.classList.add('prompt','hide');
        dialog.appendChild(prompt);

        const text = document.createElement('p');
        text.innerText = get.panel.backup.btn_confirm.title[currentLang];
        prompt.appendChild(text);

        const btnClearAccept = document.createElement('button');
        btnClearAccept.classList.add('clearyes');
        btnClearAccept.dataset.i18n = "yes";
        btnClearAccept.innerText = get.panel.backup.btn_confirm.btn_accept[currentLang];
        prompt.appendChild(btnClearAccept);

        const btnClearDissagree = document.createElement('button');
        btnClearDissagree.classList.add('clearno');
        btnClearDissagree.dataset.i18n = "no";
        btnClearDissagree.innerText = get.panel.backup.btn_confirm.btn_disagree[currentLang];
        prompt.appendChild(btnClearDissagree);

        function getLanguage(parent) {
            const container = document.createElement('div');
            container.classList.add('mtop15px');
            container.style.display = "flex";
            container.style.alignItems = "center";
            parent.appendChild(container);

            const listTitle = document.createElement('p');
            listTitle.classList.add('list-title');
            listTitle.dataset.i18n = "SelectLanguage";
            listTitle.innerText = get.panel.backup.langBar[currentLang] + " : ";
            container.appendChild(listTitle);

            const content = document.createElement('div');
            content.classList.add('content');
            container.appendChild(content);

            const select = document.createElement('select');
            select.id = "changeLanguage";
            select.classList.add('text')
            select.style.backgroundColor = "#ECD57CFF";
            select.style.width = "100%";
            select.value = localStorage.getItem('lang');
            select.addEventListener('change', () => {
                localStorage.setItem("lang", select.value);
                document.location.reload();
            });
            content.appendChild(select);

            cez.languages.forEach((lang, index) => {
                const option = document.createElement('option');
                option.value = lang;
                option.innerHTML = lang.toUpperCase();
                select.appendChild(option);
            })
        }
        getLanguage(sideBarPanel);
    }


    function Export() {
        getHome()
        getShare()
        getAbout()
        getBackup()

        sideBar.appendChild(sideBarContent);
    }
    Export();
}
function getSideBar() {
    
    getSideBarTabs();
    getSideBarContent();
}
getMeta();
getSideBar();