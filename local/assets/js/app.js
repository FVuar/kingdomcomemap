const sideBar = document.getElementById('sidebar');
let trMarkersName = chooseLanguages.tr.body.markerNames;
let cez = {
    tablist: [
        {href: "#home", title: chooseLanguages.tr.body.tablist.home, icon: "home"},
        {href: "#share", title: chooseLanguages.tr.body.tablist.share, icon: "share"},
        {href: "#about", title: chooseLanguages.tr.body.tablist.about, icon: "about"},
        {href: "#backup", title: chooseLanguages.tr.body.tablist.backup, icon: "inventory"}
    ],
    version: "1.3.1",
    languages: ['tr', 'en']
}

function getSideBarTabs() {
    const sideBarTabs = document.createElement('div');
    sideBarTabs.classList.add('sidebar-tabs');

    const ul = document.createElement('ul'),
        ul2 = document.createElement('ul');

    ul.role = "tablist";
    sideBarTabs.appendChild(ul);

    cez.tablist.forEach(item => {
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
            version.innerText = cez.version;
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
            usrLstIcon.classList.add('player');
            li.appendChild(usrLstIcon);

            // content>userList>li>input
            const userMakers = document.createElement('input');
            userMakers.type = "checkbox";
            userMakers.id = "usermakers";
            userMakers.classList.add('cc');
            userMakers.checked = true;
            li.appendChild(userMakers);

            // content>userList>li>label
            const userLabel = document.createElement('label');
            userLabel.htmlFor = userMakers.id;
            userLabel.classList.add('cl');
            userLabel.dataset.i18n = "Mymarkers";
            userLabel.innerText = trMarkersName.my_markers;
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
            Icon.classList.add('allmarkers');
            li2.appendChild(Icon);

            // content>userList>li>input
            const allMarkers = document.createElement('input');
            allMarkers.type = "checkbox";
            allMarkers.id = "allmarkers";
            allMarkers.classList.add('cc');
            allMarkers.checked = false;
            li2.appendChild(allMarkers);

            // content>userList>li>label
            const alLabel = document.createElement('label');
            alLabel.htmlFor = allMarkers.id;
            alLabel.classList.add('cl');
            alLabel.dataset.i18n = "Allmarkers";
            alLabel.innerText = trMarkersName.all_markers;
            li2.appendChild(alLabel);
        }
        function getMarkers() {
            // content>markersList
            const markersList = document.createElement('ul');
            markersList.classList.add('markers-list');
            content.appendChild(markersList);

            for (let key in trMarkersName) {
                if (trMarkersName.hasOwnProperty(key)) {
                    if (key === 'my_markers' || key === 'all_markers' || key === 'cities_names' || key === "bed") {
                        console.log('no');
                    } else {
                        // Create a list item
                        const li = document.createElement('li');

                        // Create the icon element
                        const icon = document.createElement('i');
                        icon.className = key; // Add the class based on the key
                        li.appendChild(icon);

                        // Create the checkbox element
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.id = key;
                        checkbox.className = 'cc';
                        checkbox.checked = false;
                        li.appendChild(checkbox);

                        // Create the label element
                        const label = document.createElement('label');
                        label.htmlFor = key;
                        label.className = 'cl';
                        label.setAttribute('data-i18n', key);
                        label.textContent = trMarkersName[key]; // Set the text content to the value
                        li.appendChild(label);

                        // Append the list item to the marker list
                        markersList.appendChild(li);
                    }
                }
                if(key === 'cities_names') {
                    const li2 = document.createElement('li');

                    // Create the icon element
                    const icon = document.createElement('i');
                    icon.className = "cities"; // Add the class based on the key
                    li2.appendChild(icon);

                    // Create the checkbox element
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = "textmarkers";
                    checkbox.className = 'cc';
                    checkbox.checked = false;
                    li2.appendChild(checkbox);

                    // Create the label element
                    const label = document.createElement('label');
                    label.htmlFor = "textmarkers";
                    label.className = 'cl';
                    label.dataset.i18n = "citiesNames";
                    label.innerText = trMarkersName.cities_names;
                    li2.appendChild(label);

                    // Append the list item to the marker list
                    markersList.appendChild(li2);
                }
                if(key === 'bed') {
                    const li2 = document.createElement('li');

                    // Create the icon element
                    const icon = document.createElement('i');
                    icon.className = "your_bed"; // Add the class based on the key
                    li2.appendChild(icon);

                    // Create the checkbox element
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = "bed";
                    checkbox.className = 'cc';
                    checkbox.checked = false;
                    li2.appendChild(checkbox);

                    // Create the label element
                    const label = document.createElement('label');
                    label.htmlFor = "bed";
                    label.className = 'cl';
                    label.dataset.i18n = "bed";
                    label.innerText = trMarkersName.bed;
                    li2.appendChild(label);

                    // Append the list item to the marker list
                    markersList.appendChild(li2);
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
        sideBarPanel.id = "share";
        sideBarContent.appendChild(sideBarPanel);

        sideBarClose(sideBarPanel);
        getListTitle(sideBarPanel, "send_markers", chooseLanguages.tr.body.panel.share.main_title);

        const content = document.createElement('div');
        content.classList.add('content');
        sideBarPanel.appendChild(content);

        const textDiscord = document.createElement('p');
        textDiscord.classList.add('text');
        textDiscord.innerText = chooseLanguages.tr.body.panel.share.send_discord;
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
        textReddit.innerText = chooseLanguages.tr.body.panel.share.send_reddit;
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

            const notes = chooseLanguages.tr.body.panel.about[version].notes;
            for (let key in notes) {
                if (notes.hasOwnProperty(key)) {
                    const listItem = document.createElement('li');
                    listItem.innerText = notes[key];
                    listItem.classList.add('text');
                    updateList.appendChild(listItem);
                }
            }
        }
        function getUpdate() {
            getTitle(contentUpdate, chooseLanguages.tr.body.panel.about["v1.3.1"].title, chooseLanguages.tr.body.panel.about["v1.3.1"].release_date);
            getUpdateList(contentUpdate, "v1.3.1");
            getTitle(contentUpdate, chooseLanguages.tr.body.panel.about["v1.3"].title, chooseLanguages.tr.body.panel.about["v1.3"].release_date);
            getUpdateList(contentUpdate, "v1.3");
            getTitle(contentUpdate, chooseLanguages.tr.body.panel.about["v1.2"].title, chooseLanguages.tr.body.panel.about["v1.2"].release_date);
            getUpdateList(contentUpdate, "v1.2");
            getTitle(contentUpdate, chooseLanguages.tr.body.panel.about["v1.0"].title, chooseLanguages.tr.body.panel.about["v1.0"].release_date);
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

            getText(legalInfo, 'text creator', 'Kingdom Come Deliverance Haritası', 'p');
            getText(legalInfo, 'text creator', 'RogerHN Tarafından Yaratıldı.', 'p');
            getText(legalInfo, 'text', 'İşaretçilerle ilgili yardımlarından dolayı Talys ve POiZiE\'ye çok teşekkür ederiz.', 'p');
            getText(legalInfo, 'text', 'Ayrıca <a class="link" href="https://www.pubgmap.io" target="_blank">pubgmap.io</a>\'dan Webdestroya\'ya işaretçi kodunu düzeltmeme yardım ettiği için çok teşekkür ederim.', 'p');
            getText(legalInfo, 'text', 'AhmetCan IŞIK tarafından türkçeye çevirildi.', 'p');
            getText(legalInfo, 'text', '<a class="link" href="https://www.kingdomcomerpg.com" target="_blank">Kingdom Come: Deliverance</a> logosu, simgeleri ve haritasının telif hakkı ve mülkiyeti <a class="link" href="https://warhorsestudios.cz/" target="_blank">Warhorse Studios</a>\'a aittir.', 'p');
        }

        getListTitle(sideBarPanel, "info", chooseLanguages.tr.body.panel.about.main_title);

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
        getListTitle(sideBarPanel, "ImportExportmarkers", chooseLanguages.tr.body.panel.backup.main_title);

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
        btnExport.innerText = chooseLanguages.tr.body.panel.backup.btn_export;
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
        btnImport.innerText = chooseLanguages.tr.body.panel.backup.btn_import;
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
        btnClear.innerText = chooseLanguages.tr.body.panel.backup.btn_clear;
        btnClearls.appendChild(btnClear);

        const prompt = document.createElement('div');
        prompt.classList.add('prompt','hide');
        dialog.appendChild(prompt);

        const text = document.createElement('p');
        text.innerText = chooseLanguages.tr.body.panel.backup.btn_confirm.title;
        prompt.appendChild(text);

        const btnClearAccept = document.createElement('button');
        btnClearAccept.classList.add('clearyes');
        btnClearAccept.dataset.i18n = "yes";
        btnClearAccept.innerText = chooseLanguages.tr.body.panel.backup.btn_confirm.btn_accept;
        prompt.appendChild(btnClearAccept);

        const btnClearDissagree = document.createElement('button');
        btnClearDissagree.classList.add('clearno');
        btnClearDissagree.dataset.i18n = "no";
        btnClearDissagree.innerText = chooseLanguages.tr.body.panel.backup.btn_confirm.btn_disagree;
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
            listTitle.innerText = "Dili Seç : ";
            container.appendChild(listTitle);

            const content = document.createElement('div');
            content.classList.add('content');
            container.appendChild(content);

            const select = document.createElement('select');
            select.id = "changeLanguage";
            select.classList.add('text')
            select.style.backgroundColor = "#ECD57CFF";
            select.style.width = "100%";
            select.value = "tr";
            select.addEventListener('change', () => {
                let path = window.location.origin;
                switch (select.value) {
                    case 'tr':
                        path += '/tr';
                        break;
                    default:
                        path = "https://kingdomcomemap.github.io";
                        break;
                }
                window.location.href = path;
            });
            content.appendChild(select);

            cez.languages.forEach(lang => {
                const option = document.createElement('option');
                option.value = lang;
                option.innerText = lang.toUpperCase();
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
function SideBar() {
    getSideBarTabs();
    getSideBarContent();
}
SideBar();