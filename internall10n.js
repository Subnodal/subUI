/*
    subUI

    Copyright (C) Subnodal Technologies. All Rights Reserved.

    https://subnodal.com
    Licenced by the Subnodal Open-Source Licence, which can be found at LICENCE.md.
*/

namespace("com.subnodal.subui.internall10n", function(exports) {
    var l10n = require("com.subnodal.subelements.l10n");

    exports.FALLBACK_LOCALE_CODE = "en_GB";

    var translations = {
        "en_GB": {
            "done": "Done",
            "reset": "Reset",

            "keyboardShortcutsDialog_title": "Keyboard shortcuts",
            "keyboardShortcutsDialog_unassigned": "Unassigned",
            "keyboardShortcutsDialog_assign": "Assign",
            "keyboardShortcutsDialog_unassign": "Unassign",
            "keyboardShortcutsDialog_waitingForShortcut": "Waiting for shortcut...",

            "shortcutDisplayName_openShortcutsDialog": "Open the keyboard shortcuts dialog",
            "shortcutDisplayName_selectAll": "Select all items in a list",
            "shortcutDisplayName_rename": "Rename the selected item in a list"
        },
        "fr_FR": {
            "done": "Fini",
            "reset": "Réinitialiser",

            "keyboardShortcutsDialog_title": "Raccourcis clavier",
            "keyboardShortcutsDialog_unassigned": "Non attribué",
            "keyboardShortcutsDialog_assign": "Attribuer",
            "keyboardShortcutsDialog_unassign": "Supprimer",
            "keyboardShortcutsDialog_waitingForShortcut": "En attente de raccourci...",

            "shortcutDisplayName_openShortcutsDialog": "Ouvrir la boîte de dialogue des raccourcis clavier",
            "shortcutDisplayName_selectAll": "Sélectionner tous les éléments d'une liste",
            "shortcutDisplayName_rename": "Renommer l'élément sélectionné dans une liste"
        },
        "zh_CN": {
            "done": "完成",
            "reset": "重置",

            "keyboardShortcutsDialog_title": "键盘快捷键",
            "keyboardShortcutsDialog_unassigned": "未分配",
            "keyboardShortcutsDialog_assign": "分配",
            "keyboardShortcutsDialog_unassign": "删除",
            "keyboardShortcutsDialog_waitingForShortcut": "等待捷径……",

            "shortcutDisplayName_openShortcutsDialog": "打开键盘快捷键对话框",
            "shortcutDisplayName_selectAll": "选择列表中的所有项目",
            "shortcutDisplayName_rename": "重命名列表中的选定项目"
        }
    };

    exports.getLocaleCode = function() {
        return l10n.getLocaleCode() || l10n.getSystemLocale();
    };

    exports.translate = function(string, localeCode = exports.getLocaleCode()) {
        if (translations.hasOwnProperty(localeCode)) {
            return translations[localeCode][string] || translations[exports.FALLBACK_LOCALE_CODE][string];
        }

        console.warn(`Locale not supported by subUI: ${localeCode}`);

        return translations[exports.FALLBACK_LOCALE_CODE][string];
    };
});