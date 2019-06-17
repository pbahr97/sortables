const Tabs = document.querySelectorAll(".modal-tab");
const TabContents = document.querySelectorAll(".modal-content");
const Widgets = document.querySelectorAll(".pb-widget");
const AddButton = document.querySelector(".pb-add-row");
const Block = document.querySelector("#template-container > .pb-row");
const Blocks = document.querySelector(".pb-rows");
const ModalClose = document.querySelector("#pb-modal-close");
let activeBlock;

const handleAddClick = e => {
  e.preventDefault();
  addBlock();
};

function addBlock() {
  let Clone = Block.cloneNode(true);
  Clone.querySelector(".builder-row-content").appendChild(
    PlaceholderTemplate()
  );
  Blocks.appendChild(Clone);
}

const PlaceholderTemplate = () => {
  let Wrapper = pbCreateNode("div", [
    { class: "pb-placeholder" },
    { onclick: "openModal(this)" }
  ]);
  let FaIcon = pbCreateNode("i", [
    { class: "fas fa-plus" },
    { id: "placeholder-icon" }
  ]);
  Wrapper.appendChild(FaIcon);
  return Wrapper;
};

const pbCreateNode = (type, props, html) => {
  let element = document.createElement(type);
  props &&
    props.forEach(prop => {
      let key = Object.keys(prop)[0];
      let value = prop[key];
      element.setAttribute(key, value);
    });
  html && (element.innerHTML = html);
  return element;
};

function handleRemoveClick(element) {
  const container = element.parentElement.parentElement;
  removeBlock(container);
}

function removeBlock(container) {
  if (container !== null) container.remove(container);
}

const componentDidMount = () => {
  let IntialContent = document.querySelector(".builder-row-content");
  // intial placeholder to add widget
  IntialContent.appendChild(PlaceholderTemplate());
  Widgets.forEach(widget => {
    widget.onclick = handleWidgetClick;
  });
  Tabs.forEach(tab => {
    tab.onclick = handleTabClick;
  });
};

// Modal

const Modal = document.getElementById("myModal");

const handleTabClick = tab => {
  const Tab = tab.target;
  Tabs.forEach(elem => {
    elem.classList.remove("active-tab");
  });
  TabContents.forEach(content => {
    content.classList.remove("active-content");
    if (content.classList.contains(tab.target.classList[1])) {
      content.classList.add("active-content");
    }
  });
  Tab.classList.add("active-tab");
};

const handleWindowClick = e => {
  if (e.target == Modal) {
    closeModal();
  }
};

const openModal = block => {
  activeBlock = block;
  Modal.style.display = "block";
};

const closeModal = () => {
  activeBlock = undefined;
  Modal.style.display = "none";
};

// Methods

const handleWidgetClick = e => {
  const Widget = e.target;
  const Type = Widget.getAttribute("data-type");
  let Target = activeBlock;
  let Title = Widget.querySelector("span").innerHTML;
  let Preview = document.querySelector(
    "#template-container > .pb-widget-preview"
  );
  let Clone = Preview.cloneNode(true);
  Clone.classList.add(Type);
  Clone.querySelector("div").innerHTML = Title;
  Target.parentElement.appendChild(Clone);
  Target.parentElement.appendChild(PlaceholderTemplate());
  Target.remove(Target);
  closeModal();
};

const handleWidgetRemove = widget => {
  widget.parentElement.remove(widget.parentElement);
};

// Listener
AddButton.onclick = handleAddClick;
window.onload = componentDidMount;
window.onclick = handleWindowClick;
ModalClose.onclick = () => closeModal();

// Sorting

// jQuery Sorting Lib
$(".pb-rows").sortable({
  handle: ".pb-handle",
  cursor: "grabbing"
});

// jQuery Sorting Lib
$(".builder-row-content").sortable({
  handle: ".pb-handle-widget",
  cursor: "grabbing"
});
