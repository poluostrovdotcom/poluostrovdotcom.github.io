var curPage = "";

function createMenu(where)
{
    menu = Array( 
        { url: '/award/index.html', title: 'Премия Имени Леонида Духовного',class:''},
        { url: 'story.html', title: 'История Клуба',class:''},
        { url: 'personalii.html', title: 'Персоналии',class:''},
        // { url: 'investors.html', title: 'Investors',class:''},
        // { url: 'contact.html', title: 'Contact',class:''},
        { url: 'gallery.html', title: 'Фото&nbsp;и&nbsp;видео',class:''},
        { url: 'https://www.poluostrovfestival.org/?PID=1037', title: 'Купить билеты<br><small>на&nbsp;мероприятия</small>',class:Array('menu-button')}, 
        );

    var item = window.location.href;
    item = item.substring(item.lastIndexOf('/')+1,item.length);

    target = document.getElementsByClassName(where);
    for (var n=0; n<target.length; n++)
    {
        
        for (var i=0; i<menu.length; i++) 
        {
            elem = document.createElement('li');
            if (menu[i]['class']) for (j=0; j<menu[i]['class'].length; j++) elem.classList.add(menu[i]['class'][j]);
            elem.innerHTML = "<a href='"+menu[i]['url']+"'>"+menu[i]['title']+"</a>";
            if (menu[i]['url']==item) {
                elem.classList.add('active');
                curPage = menu[i]['title'];
                }
            target[n].appendChild(elem);
            if (i<menu.length-2) 
                {
                    elem = document.createElement('li');
                    elem.classList.add('divider');
                    target[n].appendChild(elem);
                }
        }
    

    }

}

createMenu('rd-navbar-nav');
