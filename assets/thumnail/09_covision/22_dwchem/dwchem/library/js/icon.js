import data from '../../resourse/font/CovisionIconFont.json' with { type: 'json' };

const $app = document.querySelector('.components_icon');
const $total = $app.querySelector('.total_count strong');
const $version = $app.querySelector('.version strong');
const $filter = $app.querySelector('.filters');
const $order = $app.querySelector('.orders');
const $search = $app.querySelector('.search');

const originIcons =  data.icons.slice();

const originFilter =  [
    { id: 0, title: '전체 보기', selected: true },
    { id: 1, title: 'outline', selected: false },
    { id: 2, title: 'fill', selected: false },
]
const originOrders =  [
    { id: 0, title: '최신순', selected: true },
    { id: 1, title: 'a-z', selected: false },
    { id: 2, title: 'z-a', selected: false }
]

let keyword = false;
let icons = originIcons;
const filters = originFilter;
const orders = originOrders;

const setVersion = () => {
    let version = `${data.preferences.fontPref.metadata.majorVersion}.${data.preferences.fontPref.metadata.minorVersion}`;
    $version.innerHTML = version;
}

const addEvent = (eventType, selector, callback) => {
    $app.addEventListener(eventType, event => {
        if (!event.target.closest(selector)) return false;
        callback(event);
    })
}

const setfilter = () => {
    const template = `
        ${originFilter?.map((filter) => `
            <label class="cui_checkbox"><input type="radio" value="${filter.id}" name="icon_order" ${filter.selected === true && "checked" || ""} /><i></i><span>${filter.title}</span></label>         
        `).join('')}
    `
    $filter.innerHTML = template;

    addEvent('click', '[name=icon_order]', ({ target }) => {
        const seq = Number(target.value);
        filters.map(obj => {
            obj.selected = obj.id === seq ? true : false;
            return obj;
        })
        setList(getNewIcons("filter", seq), filters, orders );
    });
}

const setOrder = () => {
    const template = `
        <select id="icon_order" class="cui_select_field">
        ${originOrders.map((order) => `
            <option value="${order.id}" ${order.selected === true && "selected" || ""}>${order.title}</label>         
        `).join('')}
        </select> 
    `
    $order.innerHTML = template;

    addEvent('change', '#icon_order', ({ target }) => {
        const seq = Number(target.value);
        orders.map(obj => {
            obj.selected = obj.id === seq ? true : false;
            return obj;
        })
        setList(getNewIcons("order", seq), filters, orders );
    });
}

const setSearch = () => {
    const template = `
            <div class="icon_search"><input class="cui_text_field" id="search" placeholder="검색어를 입력하세요." type="search" /></div>
        `
    $search.innerHTML = template;

    addEvent('input', '#search', ( {target} ) => {
        setList(getNewIcons("search", target.value ), filters, orders );
    });
}
const getSearchIcons = (str) => {
    let nextIcons = originIcons;

    if( str !== '') {
        nextIcons = [...originIcons].filter( icon => {
            const name = icon.properties.name;
            return name.indexOf(str) >= 0
        })
        keyword = str;
    } else if (str === '') {
        keyword = false;
    }

    return nextIcons;

}
const isIconFill = (str) => {
    return str.substr(str.length-5, 5) === "_fill";
}
const replaceFill = (str) => {
    return isIconFill(str) ? str.replace(/_fill\s*$/, '') : str;
}
const getNewIcons = (type, seq) => {
    if(type === "search")  keyword = seq ;

    const filterSeq = type === "filter" ? seq : filters.findIndex( v => v.selected === true);
    const orderSeq = type === "order" ? seq : orders.findIndex( v => v.selected === true);
    const defaultIcons = type === "search" || keyword !== false ? getSearchIcons(keyword) : originIcons;

    if(defaultIcons.length < 1 ) {
        return defaultIcons;
    }

    let nextIcons = defaultIcons.filter(icon => {
            const checkIconFill = isIconFill(icon.properties.name);
            if (filterSeq == 1) {
                return checkIconFill === false;
            } else if (filterSeq == 2) {
                return checkIconFill === true;
            } else {
                return true;
            }
        }, []
    ).sort((a, b) => {
        console.log()
        const aName = filterSeq == 2 ? replaceFill(a.properties.name).toUpperCase() : a.properties.name.toUpperCase();
        const bName = filterSeq == 2 ? replaceFill(b.properties.name).toUpperCase() : b.properties.name.toUpperCase();
        const aCode = Number(a.properties.code);
        const bCode = Number(b.properties.code);

        if (orderSeq === 1) {
            if(aName < bName) return -1;
            if(aName > bName) return 1;
            if(aName === bName) return 0;

        } else if (orderSeq === 2) {
            if(aName < bName) return 1;
            if(aName > bName) return -1;
            if(aName === bName) return 0;

        }  else {
            return bCode - aCode;
        }
    });

    return nextIcons;
}
const setTotal = () => {
    $total.innerHTML = icons.length;
}

const setList = (nextIcons) => {
    icons = nextIcons;
    const $list = $app.querySelector('.icon_list');
    let template;

    if (nextIcons.length < 1) {
        template = `<div class="ui_empty">
            <p>조회할 목록이 없습니다.</p>
        </div>`;
    }else {
        template = nextIcons.map((item) => {
            let iconName = item.properties.name;

            if(keyword !== false && keyword !== ''){
                let regexAllCase = new RegExp(keyword, "gi");
                iconName = item.properties.name.replace(regexAllCase, `<mark>${keyword}</mark>`);
            }

            return `
                <div class="item">
                    <i data-cui-icon="${item.properties.name}" data-scss-variable="ci_${item.properties.name}"></i>
                    <em data-code="${item.properties.code}">${item.properties.code.toString(16)}</em>
                    <strong>${iconName}</strong>
                </div>           
            `
        }).join('');
    }

    $list.innerHTML = template;

    addEvent('click', '.item i', ( {target} ) => {
        const v = "$"+ target.dataset.scssVariable;

        if (navigator.clipboard !== undefined) {
            // https 접속
            navigator.clipboard.writeText(v);
        } else {
            // http 접속
            const textArea = document.createElement("textarea");
            textArea.value=v;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try{
                document.execCommand('copy')
            }catch(err){
                console.error('Unable to copy to clipboard',err)
            }
            document.body.removeChild(textArea)
        }
    });

    setTotal();
}

window.onload = function(){
    setVersion();
    setfilter();
    setOrder();
    setSearch();
    setList(getNewIcons(), filters, orders );
}