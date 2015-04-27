var categories = {
    'usga-category:championships': 'Championships',
    'usga-category:equipment': 'Equipment',
    'usga-category:course-care': 'Course Care',
    'usga-category:etiquette': 'Etiquette'
};
var subCategories = {
    'usga-sub-category:copa-de-las-americas': 'Copa de las Americas',
    'usga-sub-category:curtis-cup': 'Curtis Cup',
    'usga-sub-category:course-rating': 'Course Rating',
    'usga-sub-category:education': 'Education',
    'usga-sub-category:latin-america-amateur': 'Latin America Amateur',
    'usga-sub-category:merchandise': 'Merchandise',
    'usga-sub-category:museum': 'Museum'
};

/*var fs = require('fs');

function random(min, max) {
    return (Math.floor(Math.random() * (max - min)) + min);
}

var categoriesKeys = Object.keys(categories);
var all = [];

[".news", ".photos", ".social", ".videos"].forEach(function (part) {
    var items = JSON.parse(fs.readFileSync('./content' + part + '.json'));

    for(var i in items.items) {
        var item = items.items[i];
        var categoryKey = categoriesKeys[random(0, categoriesKeys.length)];
        var subCategoriesKeys = Object.keys(subCategories);
        var subCategoryKey = subCategoriesKeys[random(0, subCategoriesKeys.length)];

        item.categories = categoryKey ? [categories[categoryKey]] : [];
        item.subCategories = subCategoryKey ? [subCategories[subCategoryKey]] : [];
        item._tags = [];
        if (categoryKey) {
            item._tags.push(categoryKey);
        }
        if (subCategoryKey) {
            item._tags.push(subCategoryKey);
        }
        all.push(item);
    }

    fs.writeFileSync('./content' + part + '.json', JSON.stringify({items: items.items}));
});

fs.writeFileSync('./content.json', JSON.stringify({items: all}));*/