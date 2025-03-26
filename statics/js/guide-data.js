// 攻略数据文件
const guideData = {
    // 温泉攻略数据
    hotSpringGuide: {
        guides: [
            {
                title: "温泉使用技巧",
                tips: [
                    "温泉经验只与自己的温泉等级有关。",
                    "获取喝茶buff需要泡温泉，坐进去然后喝茶。",
                    "每周温泉喝茶buff刷新时间为周一早上8点。",
                    "没有60级的星宝是不能泡温泉和获取喝茶buff的哦。",
                    "喝茶的buff可持续48小时，期间无需再次喝茶，但可以早八喝茶换buff。",
                    "早上8点后可以重新泡温泉获取经验。",
                    "温泉buff只能同时存在一个，上一个时间没到，强行喝茶会提示你是否替换当前效果。"
                ]
            }
        ]
    },

    // 吞吞花攻略数据
    flowerGuide: {
        guides: [
            {
                title: "吞吞花种植技巧",
                tips: [
                    "种植时间：周二21点30分到周五晚21点30分，周五晚21点30分到周日晚21点30分。",
                    "卡种植时间每周可以吃两次双倍。",
                    "成长：幼年期48小时-成熟期24小时",
                    "幼年期不吞食，成熟期开始吞食，熟练度满级后停止吞食。成熟期结束才可收获。",
                    "成熟期吞噬：普通吃一波。祈愿金色吃一波，祈愿彩色吃一波。",
                    "周一晚上9点成熟后，收取后不种吞吞花。",
                    "注意：吞吞花熟练度满级后无法吞食，所以要在成熟期前菜先成熟。"
                ]
            }
        ]
    },

    // 商人攻略数据
    marketValueGuide: {
        title: "双倍商人售价参考（仅供参考）",
        flowers: [
            {
                name: "双倍夏腊梅",
                tag: "82级-87级触发，X16作物",
                singleAmount: 1000,
                singleValue: 0.9,
                totalAmount: 3000,
                totalValue: 2.7
            },
            {
                name: "双倍雪滴花",
                tag: "88级-93级触发，X16作物",
                singleAmount: 1800,
                singleValue: 1.49,
                totalAmount: 3600,
                totalValue: 4.47
            },
            {
                name: "双倍樱花",
                tag: "94级-99级触发，X16作物",
                singleAmount: 1300,
                singleValue: 2,
                totalAmount: 3900,
                totalValue: 6
            },
            {
                name: "双倍月季",
                tag: "100级，X16作物",
                singleAmount: 1500,
                singleValue: 2.5,
                totalAmount: 4500,
                totalValue: 7.5
            },
            {
                name: "双倍丁香花",
                tag: "神农·初心触发，X16作物",
                singleAmount: 1700,
                singleValue: 3.42,
                totalAmount: 5100,
                totalValue: 10.26
            },
            {
                name: "双倍康乃馨",
                tag: "神农·初心触发，X8作物",
                singleAmount: 3400,
                singleValue: 4.71,
                totalAmount: 10200,
                totalValue: 14.13
            },
            {
                name: "双倍莲花掌",
                tag: "神农·莹草触发，X16作物",
                singleAmount: 910,
                singleValue: 5.2,
                totalAmount: 2730,
                totalValue: 15.6
            },
            {
                name: "双倍莲翘",
                tag: "神农·莹草触发，X8作物",
                singleAmount: 3600,
                singleValue: 6.32,
                totalAmount: 10800,
                totalValue: 18.96
            },
            {
                name: "双倍仙客来",
                tag: "神农·百花触发，X16作物",
                singleAmount: 2100,
                singleValue: 7.7,
                totalAmount: 6300,
                totalValue: 23.1
            },
            {
                name: "双倍玉蝶",
                tag: "神农·百花触发，X8作物",
                singleAmount: 4200,
                singleValue: 10.26,
                totalAmount: 12600,
                totalValue: 30.78
            },
            {
                name: "双倍玄晶莲",
                tag: "神农·月华触发，X16作物",
                singleAmount: '未知',
                singleValue: '未知',
                totalAmount: '未知',
                totalValue: '未知'
            },
            {
                name: "双倍紫羽兰",
                tag: "神农·月华触发，X8作物",
                singleAmount: '未知',
                singleValue: '未知',
                totalAmount: '未知',
                totalValue: '未知'
            },
            {
                name: "双倍紫梦鸢",
                tag: "神农·圣灵触发，X16作物",
                singleAmount: '未知',
                singleValue: '未知',
                totalAmount: '未知',
                totalValue: '未知'
            },
            {
                name: "双倍月影兰",
                tag: "神农·圣灵触发，X8作物",
                singleAmount: '未知',
                singleValue: '未知',
                totalAmount: '未知',
                totalValue: '未知'
            }
        ],
        notes: [
            "数据仅供参考，实际价值与摊主等级相关。",
            "总计数量为三次可售卖的总数。",
            "总价值为三次售卖的总价值。"
        ]
    }
}; 