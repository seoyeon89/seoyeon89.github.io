const url_root = '/assets/thumnail/09_covision/22_dwchem/dwchem';
const menuData = [
    {
        label: "Icons",
        link: `${url_root}/library/icon.html`,
        children: []
    },
    {
        label: "Components",
        children: [
            { label: "layout",
              children: [
                    { label: "app", link: `${url_root}/library/layout_app.html`, children: [] },
                    { label: "section", link: `${url_root}/library/layout_section.html`, children: [] },
                ] },
            {
                label: "요소간 정렬", children: [
                    { label: "한줄 정렬(가로형)", link: `${url_root}/library/layout_align-item.html`, children: [] },
                    { label: "한줄 정렬(세로형)", link: `${url_root}/library/layout_align-vertical-item.html`, children: [] },
                    { label: "한줄 정렬(복합형)", link: `${url_root}/library/layout_align-multi-item.html`, children: [] },
                ]
            },
            {
                label: "Atoms",
                children: [
                    { label: "title", link: `${url_root}/library/atoms_title.html`, children: [] },
                    { label: "Button", link: `${url_root}/library/atoms_button.html`, children: [] },
                    { label: "Radio/Checkbox/Select", link: `${url_root}/library/atoms_radio-checkbox-select.html`, children: [] },
                    { label: "Input/Textarea", link: `${url_root}/library/atoms_input-textarea.html`, children: [] },
                    { label: "datePicker", link: `${url_root}/library/atoms_datepicker.html`, children: [] },
                    { label: "Table", link: `${url_root}/library/atoms_table.html`, children: [] },
                    { label: "Tab", link: `${url_root}/library/atoms_tab.html`, children: [] },
                    { label: "Step", link: `${url_root}/library/atoms_step.html`, children: [] },
                    { label: "tooltip", link: `${url_root}/library/atoms_tooltip.html`, children: [] },
                    { label: "alert", link: `${url_root}/library/atoms_alert.html`, children: [] },
                ]
            },
            {
                label: "molecules/organisms",
                children: [
                    { label: "gnb", link: `${url_root}/library/organisms_gnb.html`, children: [] },
                    { label: "lnb", link: `${url_root}/library/organisms_lnb.html`, children: [] },
                    { label: "search", link: `${url_root}/library/organisms_search.html`, children: [] },
                    { label: "toolbar", link: `${url_root}/library/organisms_toolbar.html`, children: [] },
                    { label: "modal", link: `${url_root}/library/organisms_modal.html`, children: [] },
                    { label: "pagination", link: `${url_root}/library/molecules_pagination.html`, children: [] },
                    { label: "첨부파일", link: `${url_root}/library/molecules_attachments.html`, children: [] },
                ]
            }
        ]
    },
    {
        label: "Publish",
        link: `${url_root}/library/publish_list.html`,
        children: []
    }
];

// 메뉴 생성 함수
function createMenu(menuData, path) {
    const currentPath = path;
    const ul = document.createElement("ul");

    menuData.forEach(function(item) {
        const li = document.createElement("li");
        const hasChildren = item.children && item.children.length > 0;

        if (hasChildren) {
            const button = document.createElement("button");
            button.type = "button";
            button.classList.add("nav_item");

            if (item.link === currentPath) {
                button.classList.add("active");
            }

            const span = document.createElement("span");
            span.classList.add("nav_label");
            span.textContent = item.label;
            button.appendChild(span);

            const icon = document.createElement("i");
            icon.classList.add("nav_toggle", "cui_button", "icon", "endpoint");
            const iconText = document.createElement("span");
            iconText.textContent = "열기";
            icon.appendChild(iconText);
            button.appendChild(icon);

            li.appendChild(button);

            // 하위 메뉴 생성
            const subUl = createMenu(item.children, currentPath);
            li.appendChild(subUl);

        } else {
            // 링크로 메뉴 생성 (하위 메뉴가 없는 경우)
            const a = document.createElement("a");
            a.href = item.link;
            a.classList.add("nav_item");

            if (item.link === currentPath) {
                a.setAttribute('aria-selected', "true");
            }

            const span = document.createElement("span");
            span.classList.add("nav_label");
            span.textContent = item.label;
            a.appendChild(span);

            li.appendChild(a);
        }

        ul.appendChild(li);
    });

    return ul;
}

function setEnter(target) {
    let currentParent = target.closest('li');
    target.setAttribute('aria-selected', 'true');
    while (currentParent) {
        const parentButton = currentParent.querySelector('.nav_item');
        const hasParentToggle = parentButton?.querySelector('.nav_toggle') || false;

        if (hasParentToggle) {
            currentParent.setAttribute('aria-expanded', 'true');
        }

        currentParent = currentParent.parentElement.closest('li');  // 상위 부모로 이동
    }
}

function removeTextBefore(inputString, searchString) {
    const index = inputString.indexOf(searchString);

    if (index !== -1) {
        return inputString.slice(index);
    } else {
        return inputString;
    }
}

// 초기화 시 현재 경로와 일치하는 메뉴 항목 처리
function initializeMenu(menuData, currentPath) {
    const menuItems = document.querySelectorAll('.nav_item');

    menuItems.forEach(function(item) {
        const link = item.getAttribute('href') || '';
        if (removeTextBefore(link, url_root) === removeTextBefore(currentPath , url_root)) {
            setEnter(item);
        }
    });
}

const menuContainer = document.querySelector(".nav_root");
const menu = createMenu(menuData, window.location.pathname);
menuContainer?.appendChild(menu);

// 현재 경로에 맞는 메뉴 항목을 활성화 처리
initializeMenu(menuData, window.location.pathname);


// 문자열 치환 함수: 태그를 읽고 HTML 엔티티로 변환
function escapeHtml(unsafe) {
    return unsafe // 문자열 앞뒤의 공백 제거
        // Boolean 속성 처리 (checked, disabled 등이 ""로 변환되지 않도록)
        .replace(/\b(checked|disabled|readonly|required|autofocus|multiple|novalidate|selected|hidden|formnovalidate)(="")?/g, '$1')
        // HTML 엔티티 변환
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 공백만 있는 텍스트 노드를 제거하는 함수
function removeElementWhitespace(element) {
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && !/\S/.test(node.textContent)) {
            // 공백만 있는 텍스트 노드 제거
            element.removeChild(node);
        }
    });
}

// 공백 개수를 기반으로 모든 줄의 공백을 제거하여 왼쪽으로 정렬하는 함수
function shiftLeftByFirstLineIndentation(content) {
    const lines = content.split('\n'); // 줄 단위로 나누기
    let firstNonEmptyLineIndex = -1;
    let firstLineIndentation = 0;

    // 첫 번째 비공백 문자열을 만날 때까지의 공백 개수 계산
    for (let i = 0; i < lines.length; i++) {
        const match = lines[i].match(/^\s+/); // 줄 맨 앞의 공백을 찾음
        if (match && match[0].trim().length === 0 && lines[i].trim().length > 0) {
            firstNonEmptyLineIndex = i;
            firstLineIndentation = match[0].length; // 공백의 개수를 기록
            break;
        }
    }

    // 각 줄에서 첫 번째 공백 개수만큼 제거하여 왼쪽으로 이동
    if (firstNonEmptyLineIndex !== -1 && firstLineIndentation > 0) {
        return lines.map(line => line.replace(new RegExp(`^\\s{0,${firstLineIndentation}}`), '')).join('\n');
    }

    return content; // 공백이 없거나 모든 줄이 비어있는 경우 원본 반환
}

// 실제 HTML 태그를 엔티티로 변환하는 함수
function convertCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.components_code');
    codeBlocks.forEach((block) => {
        const code = block.querySelector('code');
        const pre = block.querySelector('pre');

        // pre와 code 사이의 공백을 제거
        removeElementWhitespace(block);  // components_code와 pre 사이 공백 제거
        removeElementWhitespace(pre);    // pre와 code 사이 공백 제거

        // 공백과 줄바꿈을 보존한 상태로 innerHTML을 유지
        const originalContent = code.innerHTML;
        const escapedContent = escapeHtml(originalContent); // 엔티티 변환만 수행

        // 공백을 왼쪽으로 정렬
        const shiftedContent = shiftLeftByFirstLineIndentation(escapedContent);

        // 기존 내용을 교체 (줄바꿈 및 공백 유지)
        code.innerHTML = shiftedContent.trim();
    });
}

// highlight.js 적용 함수
function applyHighlight() {
    if (window.hljs) {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightElement(block);
        });
    }
}

convertCodeBlocks(); // 먼저 문자열 치환 및 공백 유지
applyHighlight(); // highlight.js 적용


