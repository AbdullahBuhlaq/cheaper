export const adminPermission = {
  "أصناف المحلات": {
    "إنشاء صنف متجر جديد": "admin.category.create",
    "تحديث معلومات صنف متجر": "admin.category.update",
    "حذف صنف متجر": "admin.category.delete",
    "كل الصلاحيات داحل قسم أصناف المتاجر": "admin.category.all",
    "رؤية الرسم الإحصائي الخاص بأصناف المتاجر": "admin.category.chart",
  },
  الأدوار: {
    "إنشاء دور جديد": "admin.role.create",
    "تحديث معلومات الأدوار": "admin.role.update",
    "حذف دور": "admin.role.delete",
    "كل الصلاحيات داخل قسم الأدوار": "admin.role.all",
  },
  الباقات: {
    "إنشاء باقة جديدة": "admin.packs.create",
    "تحديث المعلومات الخاصة بالباقات": "admin.packs.update",
    "حذف باقة": "admin.packs.delete",
    "كل الصلاحيات داخل قسم الباقات": "admin.packs.all",
    "رؤية الرسم الإحصائي الخاص بالباقات": "admin.packs.chart",
  },
  الموظفين: {
    "إنشاء حساب لموظف جديد": "admin.employee.create",
    "تحديث معلومات الموظفين": "admin.employee.update",
    "حذف موظفين": "admin.employee.delete",
    "كل الصلاحيات داخل قسم الموظفين": "admin.employee.all",
  },
  الحظورات: {
    "إنشاء نوع حظر جديد": "admin.block.create",
    "تحديث معلومات نوع الحظر": "admin.block.update",
    "حذف نوع حظر": "admin.block.delete",
    "كل الصلاحيات داخل قسم الحظورات": "admin.block.all",
  },
  المستخدمين: {
    "حظر مستخدم ما في الموقع": "admin.users.block.blockUser",
    "فك الحظر عن مستخدم ما في الموقع": "admin.users.block.multiUnBlock",
    "حذف حظر من سجل الحظورات للمستخدم ": "admin.users.block.deleteEveryBlock",
    "كل الصلاحيات الخاصة بحظر المستخدمين": "admin.users.block.allBlockForUser",
    "رؤية الرسم الإحصائي الخاص بالمستخدم": "admin.users.block.chartUser",
    "رؤية معلومات المستخدمين في الموقع": "admin.users.block.information",
    "رؤية العروض التي كسبها المستخدم": "admin.users.block.offerUser",
    "رؤية المحلات التي ربح منها المستخدم": "admin.users.block.allBlockForUser",
    "تحديث المعلومات الخاصة بالمستخدمين": "admin.users.update",
    "حذف مستخدم من الموقع": "admin.users.delete",
    "البحث عن مستخدمين في الموقع": "admin.users.filterAndSearch",
    "رؤية المعلومات الإحصائية الخاصة بالمستخدمين": "admin.users.statisticsInfo",
    "رؤية الرسم الإحصائي عن المستخدمين ": "admin.users.chart",
  },
  الإحصائيات: {
    "رؤية إحصائيات عامة عن الموقع": "admin.home.getCount",
    "رؤية الرسم الإحصائي الخاص بعدد المستخدمين": "admin.home.chartUsers",
    "رؤية الرسم الإحصائي الخاص بعدد المحلات": "admin.home.chartStores",
    "رؤية الرسم الإحصائي الخاص بالمدن": "admin.home.cityChart",
    "رؤية الرسم الإحصائي الخاص بالكروت المكتسبة": "admin.home.cartChart",
  },

  المحلات: {
    "رؤية الرسم الإحصائي الخاص بالمحلات": "admin.store.accepted.chart",
    "رؤية معلومات المحلات": "admin.store.accepted.info",
    "حظر الحسابات الخاصة بالمحلات": "admin.store.accepted.block",
    "فك الحظر عن المحلات المحظورة": "admin.store.accepted.unblock",
    "كل الصلاحيات الخاصة بحظر المحلات": "admin.store.accepted.unblock",
    "رؤية التقييمات والإبلاغات عن محل ما في الموقع": "admin.store.accepted.evaluationAndSpam",
    "رؤية سجل الاشتراكات في الباقات لمحل ما": "admin.store.accepted.packs",
    "رؤية المستخدمين الئين قاموا بالشراء من محل ما": "admin.store.accepted.users",
    "كل الصلاحيات الخاصة بقسم المحلات": "admin.store.all",
    "قبول طلب انضمام محل جديد": "admin.store.accept",
    "إيقاف حساب خاص بمحل في الموقع": "admin.store.disable",
    "إعادة تفعيل حساب محل موقوف": "admin.store.enable",
  },
  الإشعارات: { "إرسال إشعارات للمستخدمين وأصحاب المحلات": "admin.notification.send" },
  "القيم الأساسية": { "تحديث القيم الأساسية في الموقع": "admin.config.update", "رؤية القيم الأساسية في الموقع": "admin.config.all" },
};

export const userPermission = {
  everything: { myOffer: "user.myOffer", spamAndEvaluation: "user.spamAndEvaluation", gift: "user.gift", moreEvaluation: "user.moreEvaluation", home: "user.home", openBox: "user.openBox" },
};

export const shopkeeperPermission = {
  everything: {
    verifyQr: "manager.verifyQr",
    updateStore: "manager.updateStore",
    allPack: "manager.allPack",
    deletePack: "manager.deletePack",
    choosePack: "manager.choosePack",
    updateDiscount: "manager.updateDiscount",
    uploadStory: "manager.uploadStory",
    deleteStory: "manager.deleteStory",
    uploadAvatar: "manager.uploadAvatar",
    deleteAvatar: "manager.deleteAvatar",
    getStoreInfo: "manager.getStoreInfo",
  },
};
