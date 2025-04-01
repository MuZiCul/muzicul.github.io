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
    FridayGuide: {
        guides: [
            {
                title: "元梦星期五活动轮动-上半年",
                tips: [
                    { content: "日期：01.03-01.06，02.07-02.10，03.14-03.17，04.18-04.21，05.23-05.26；🌸活动内容：鱼饵价格降低" },
                    { content: "日期：01.10-01.13，02.14-02.17，03.21-03.24，04.25-04.28，05.30-06.02；🌸活动内容：祈福次数&被祈福次数增加" },
                    { content: "日期：01.17-01.20，02.21-02.24，03.28-03.31，05.02-05.05，06.06-06.09；🌸活动内容：作物&动物熟练度提升" },
                    { content: "日期：01.24-01.27，02.28-03.03，04.04-04.07，05.09-05.12，06.13-06.16；🌸活动内容：作物丰收大丰收提升" },
                    { content: "日期：01.31-02.03，03.07-03.10，04.11-04.14，05.16-05.19，06.20-06.23；🌸活动内容：加工器容量提升" },
                ]
            },
            {
                title: "元梦星期五活动轮动-下半年",
                tips: [
                    { content: "日期：08.01-08.04，09.05-09.08，10.10-10.13，11.14-11.17，12.19-12.22；🌸活动内容：鱼饵价格降低" },
                    { content: "日期：07.04-07.07，08.08-08.11，09.12-09.15，10.17-10.20，11.21-11.24；🌸活动内容：祈福次数&被祈福次数增加" },
                    { content: "日期：07.11-07.14，08.15-08.18，09.19-09.22，10.24-10.27，11.28-12.01；🌸活动内容：作物&动物熟练度提升" },
                    { content: "日期：07.18-07.21，08.22-08.25，09.26-09.29，10.31-11.03，12.05-12.08；🌸活动内容：作物丰收大丰收提升" },
                    { content: "日期：07.25-07.28，08.29-09.01，10.03-10.06，11.07-11.10，12.12-12.15；🌸活动内容：加工器容量提升" },
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