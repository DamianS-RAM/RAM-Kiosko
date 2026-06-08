function loader(msg = "Cargando") {
    const loader_screen = document.createElement('div');
    loader_screen.classList.add("loader_screen");
    
    const loader_content = document.createElement('div');
    loader_content.classList.add(...['loader_content', 'font-roboto', 'noselect']);
    loader_content.textContent = msg;
    
    const loader_icon = document.createElement('span');
    loader_icon.classList.add('loader-icon');

    loader_screen.appendChild(loader_content);
    loader_screen.appendChild(loader_icon);

    document.body.appendChild(loader_screen);

}