import './style.scss';

let options: IntersectionObserverInit = {
    root: document.querySelector('.gallery'),
    rootMargin: "0px 0px 400px 0px",
    threshold: 1
};

const pageSize: number = 5;
let itemIndex = 0;
function getNewPage() :DocumentFragment {
    const documentFrag :DocumentFragment = new DocumentFragment();
    for(let i = 0; i < pageSize; i++) {
        itemIndex++;
        let newItem :HTMLDivElement = document.createElement('div');
        newItem.classList.add('gallery-item');
        newItem.style.backgroundImage = `url("https://picsum.photos/id/${itemIndex}/600/400")`;
        documentFrag.appendChild(newItem);
    }

    return documentFrag;
}

let callback: IntersectionObserverCallback = (entries, observer) => {
    if(entries[0].isIntersecting) {
        const gallery: HTMLDivElement = document.querySelector<HTMLDivElement>('.gallery');
        const endOfGallery :HTMLDivElement = document.getElementById('endOfGallery') as HTMLDivElement;
        const newPage: DocumentFragment = getNewPage();

        gallery.insertBefore(newPage, endOfGallery);

        document.querySelector('h1').innerText = `Infinite Gallery (${gallery.children.length - 1} elements)`;
    }
};

let observer = new IntersectionObserver(callback, options);
observer.observe(document.getElementById('endOfGallery'));

