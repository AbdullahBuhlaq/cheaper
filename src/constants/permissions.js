export const adminPermission = {
  "أصناف المحلات": {
    "إنشاء صنف متجر جديد": "admin.category.create",
    "تحديث معلومات صنف متجر": "admin.category.update",
    "حذف صنف متجر": "admin.category.delete",
    "طلب معلومات أصناف المتاجر في الموقع": "admin.category.all",
    "رؤية الرسم الإحصائي الخاص بأصناف المتاجر": "admin.category.chart",
  },
  الأدوار: {
    "إنشاء دور جديد": "admin.role.create",
    "تحديث معلومات الأدوار": "admin.role.update",
    "حذف دور": "admin.role.delete",
    "طلب معلومات الأدوار في الموقع": "admin.role.all",
  },
  الباقات: {
    "إنشاء باقة جديدة": "admin.packs.create",
    "تحديث المعلومات الخاصة بالباقات": "admin.packs.update",
    "حذف باقة": "admin.packs.delete",
    "طلب معلومات الباقات في الموقع": "admin.packs.all",
    "رؤية الرسم الإحصائي الخاص بالباقات": "admin.packs.chart",
  },
  الموظفين: {
    "إنشاء حساب لموظف جديد": "admin.employee.create",
    "تحديث معلومات الموظفين": "admin.employee.update",
    "حذف موظفين": "admin.employee.delete",
    "طلب معلومات الموظفين في الموقع": "admin.employee.all",
  },
  الحظورات: {
    "إنشاء نوع حظر جديد": "admin.block.create",
    "تحديث معلومات نوع الحظر": "admin.block.update",
    "حذف نوع حظر": "admin.block.delete",
    "طلب معلومات الحظورات في الموقع": "admin.block.all",
  },
  المستخدمين: {
    "حظر مستخدم ما في الموقع": "admin.users.block.blockUser",
    "فك الحظر عن مستخدم ما في الموقع": "admin.users.block.multiUnBlock",
    "حذف حظر من سجل الحظورات للمستخدم ": "admin.users.block.deleteBlock",
    "رؤية سجل الحظورات الخاص بالمستخدم": "admin.users.block.allBlockForUser",
    "رؤية الرسم الإحصائي الخاص بالمستخدم": "admin.users.block.chartUser",
    "رؤية معلومات المستخدمين في الموقع": "admin.users.block.information",
    "رؤية العروض التي كسبها المستخدم": "admin.users.block.offerUser",
    "عرض قائمة المحلات التي اشترى منها المستخدم": "admin.users.block.informationStoreInfo",
    "تحديث المعلومات الخاصة بالمستخدمين": "admin.users.update",
    "حذف مستخدم من الموقع": "admin.users.delete",
    "طلب معلومات المستخدمين في الموقع": "admin.users.filterAndSearch",
    "رؤية المعلومات الإحصائية الخاصة بالمستخدمين": "admin.users.statisticsInfo",
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
    "حذف حظر من سجل حظورات المحل": "admin.store.accepted.deleteBlock",
    "عرض سجل الحظورات الخاص بالمحل": "admin.store.accepted.allBlock",

    "رؤية التقييمات والإبلاغات عن محل ما في الموقع": "admin.store.accepted.evaluationAndSpam",
    "رؤية سجل الاشتراكات في الباقات لمحل ما": "admin.store.accepted.packs",
    "رؤية المستخدمين الذين قاموا بالشراء من محل ما": "admin.store.accepted.users",
    "طلب معلومات المحلات في الموقع": "admin.store.all",
    "قبول طلب انضمام محل جديد": "admin.store.accept",
    "إيقاف حساب خاص بمحل في الموقع": "admin.store.disable",
    "إعادة تفعيل حساب محل موقوف": "admin.store.enable",
  },
  الإشعارات: { "إرسال إشعارات للمستخدمين وأصحاب المحلات": "admin.notification.send" },
  "القيم الأساسية": { "تحديث القيم الأساسية في الموقع": "admin.config.update", "رؤية القيم الأساسية في الموقع": "admin.config.all" },
};

export const userPermission = {
  العروض: {
    "رؤية سجل العروض التي ربحها": "user.myOffer",
    "إهداء العرض إلى مستخدم آخر": "user.gift",
    "بيانات إحصائية حول آخر العروض التي ربحها": "user.home",
    "فتح كرت لربح عرض جديد": "user.openBox",
  },
  "تقييم المحلات": {
    "رؤية تقييمات المحل الذي ربح منه عروض": "user.moreEvaluation",
    "إمكانية تقييم المحل والإبلاغ عنه": "user.spamAndEvaluation",
  },
};

export const shopkeeperPermission = {
  "معلومات المحل": {
    "مسح رمز ال QR عند المستخدم": "manager.verifyQr",
    "تحديث المعلومات الخاصة بالمحل": "manager.updateStore",
    "طلب المعلومات الخاصة بالمحل": "manager.getStoreInfo",
    "الظهور في العروض اليومية": "store.disableShowInCart",
  },
  الباقات: {
    "إلغاء تفعيل باقة": "manager.deletePack",
    "الاشتراك بباقة جديدة": "manager.choosePack",
    "تعديل قيمة الخصم الخاصة بالباقة": "manager.updateDiscount",
  },
  الصور: {
    "رفع صور حالات": "manager.uploadStory",
    "حذف صور حالات": "manager.deleteStory",
    "رفع صورة المحل": "manager.uploadAvatar",
    "حذف صورة المحل": "manager.deleteAvatar",
  },
};
