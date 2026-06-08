const dashboardMockData = {
    kpiCards: [
        { id: 'institutions', title: '机构人数', dataKey: 'institutions', unit: '人', icon: 'fas fa-users', theme: 'theme-primary', decimals: 0 },
        { id: 'subInstitutions', title: '子机构个数', dataKey: 'subInstitutionCount', unit: '个', icon: 'fas fa-building', theme: 'theme-primary', decimals: 0 },
        { id: 'totalStudents', title: '学员总数', dataKey: 'totalStudents', unit: '人', icon: 'fas fa-graduation-cap', theme: 'theme-student', decimals: 0 },
        { id: 'totalTeachers', title: '讲师数量', dataKey: 'totalTeachers', unit: '人', icon: 'fas fa-chalkboard-teacher', theme: 'theme-course', decimals: 0 },
        { id: 'totalCourses', title: '课程总数', dataKey: 'totalCourses', unit: '门', icon: 'fas fa-book-open', theme: 'theme-course', decimals: 0 },
        { id: 'questionBankCount', title: '题库总量', dataKey: 'questionBankCount', unit: '道', icon: 'fas fa-file-question', theme: 'theme-exam', decimals: 0 },
        { id: 'examPassRate', title: '考试通过率', dataKey: 'examPassRate', unit: '%', icon: 'fas fa-check-circle', theme: 'theme-certificate', decimals: 1, isRate: true },
        { id: 'totalOrders', title: '订单总数', dataKey: 'totalOrders', unit: '笔', icon: 'fas fa-shopping-cart', theme: 'theme-order', decimals: 0 },
        { id: 'totalAmount', title: '订单金额（万）', dataKey: 'totalAmount', unit: '', icon: 'fas fa-yen-sign', theme: 'theme-order', decimals: 1, isMoney: true }
    ],
    kpiData: {
        institutions: 286,
        subInstitutionCount: 12,
        totalStudents: 5236,
        totalCourses: 288,
        totalTeachers: 156,
        totalOrders: 3856,
        totalAmount: 2856000,
        examPassRate: 92.5,
        questionBankCount: 12580,
        certificates: 4856
    },
    kpiTrends: {
        institutions: { value: '+12.5%', trend: 'up' },
        subInstitutionCount: { value: '', trend: 'neutral' },
        totalStudents: { value: '+17.3%', trend: 'up' },
        totalCourses: { value: '+8.5%', trend: 'up' },
        totalTeachers: { value: '+12.1%', trend: 'up' },
        totalOrders: { value: '+19.2%', trend: 'up' },
        totalAmount: { value: '+12.5%', trend: 'up' },
        examPassRate: { value: '+3.2%', trend: 'up' },
        questionBankCount: { value: '+25.8%', trend: 'up' },
        certificates: { value: '+22.4%', trend: 'up' }
    },
    mapData: [
        { name: '北京', value: 850, students: 12560 },
        { name: '上海', value: 720, students: 10800 },
        { name: '广州', value: 680, students: 9560 },
        { name: '深圳', value: 560, students: 8200 },
        { name: '成都', value: 480, students: 7120 },
        { name: '武汉', value: 420, students: 6280 },
        { name: '杭州', value: 380, students: 5680 },
        { name: '南京', value: 350, students: 5200 },
        { name: '重庆', value: 320, students: 4780 },
        { name: '济南', value: 280, students: 4180 },
        { name: '西安', value: 260, students: 3880 },
        { name: '厦门', value: 220, students: 3280 }
    ],
    courseCategories: [
        { name: '养老护理员', value: 98, students: 2450, rate: 96 },
        { name: '老年人评估师', value: 65, students: 1890, rate: 95 },
        { name: '健康照护师', value: 58, students: 1560, rate: 94 },
        { name: '营养配餐员', value: 42, students: 1120, rate: 92 },
        { name: '其他课程', value: 25, students: 680, rate: 90 }
    ],
    monthlyOrders: [
        { month: '1月', orders: 520, amount: 386000 },
        { month: '2月', orders: 410, amount: 302000 },
        { month: '3月', orders: 580, amount: 428000 },
        { month: '4月', orders: 680, amount: 501000 },
        { month: '5月', orders: 760, amount: 562000 },
        { month: '6月', orders: 906, amount: 677000 }
    ],
    studentGrowth: [
        { month: '1月', value: 680 },
        { month: '2月', value: 520 },
        { month: '3月', value: 750 },
        { month: '4月', value: 890 },
        { month: '5月', value: 980 },
        { month: '6月', value: 1150 }
    ],
    examPassData: [
        { type: '养老护理员', total: 320, pass: 296, rate: 92.5, lastRate: 90.2 },
        { type: '老年人评估师', total: 210, pass: 198, rate: 94.2, lastRate: 91.8 },
        { type: '健康照护师', total: 130, pass: 118, rate: 90.8, lastRate: 88.5 },
        { type: '营养配餐员', total: 90, pass: 80, rate: 88.5, lastRate: 86.2 }
    ],
    recentStudents: [
        { name: '张**', city: '北京', course: '养老护理员', time: '刚刚' },
        { name: '李**', city: '上海', course: '老年人评估师', time: '2分钟前' },
        { name: '王**', city: '广州', course: '健康照护师', time: '5分钟前' },
        { name: '赵**', city: '深圳', course: '养老护理员', time: '8分钟前' },
        { name: '刘**', city: '成都', course: '营养配餐员', time: '12分钟前' },
        { name: '陈**', city: '武汉', course: '养老护理员', time: '15分钟前' },
        { name: '杨**', city: '杭州', course: '老年人评估师', time: '18分钟前' },
        { name: '黄**', city: '南京', course: '健康照护师', time: '22分钟前' }
    ],
    hotCourses: [
        { name: '养老护理基础课程', students: 2450, rate: 96 },
        { name: '老年人能力评估', students: 1890, rate: 95 },
        { name: '健康照护实操', students: 1560, rate: 94 },
        { name: '营养配餐技巧', students: 1120, rate: 92 }
    ],
    departmentData: [
        { name: '教学部', value: 156 },
        { name: '运营部', value: 45 },
        { name: '客服部', value: 32 },
        { name: '财务部', value: 23 },
        { name: '人事部', value: 15 },
        { name: '技术部', value: 15 }
    ],
    questionBankData: [
        { type: '养老护理员', count: 3200, ratio: 25.4, correctRate: 78 },
        { type: '老年人评估师', count: 2800, ratio: 22.3, correctRate: 76 },
        { type: '健康照护师', count: 2500, ratio: 19.9, correctRate: 75 },
        { type: '营养配餐员', count: 2200, ratio: 17.5, correctRate: 74 },
        { type: '其他科目', count: 1880, ratio: 14.9, correctRate: 72 }
    ],
    orderTypeData: [
        { type: '养老护理员', orders: 1256, amount: 899000, ratio: 31.5 },
        { type: '老年人评估师', orders: 892, amount: 1338000, ratio: 46.8 },
        { type: '健康照护师', orders: 876, amount: 438000, ratio: 15.3 },
        { type: '营养配餐员', orders: 832, amount: 181000, ratio: 6.4 }
    ],
    subInstitutionData: [
        { name: '北京', value: 850 },
        { name: '上海', value: 720 },
        { name: '广州', value: 680 },
        { name: '深圳', value: 560 },
        { name: '成都', value: 480 },
        { name: '武汉', value: 420 },
        { name: '杭州', value: 380 },
        { name: '南京', value: 350 },
        { name: '重庆', value: 320 },
        { name: '济南', value: 280 },
        { name: '西安', value: 260 },
        { name: '厦门', value: 220 }
    ],
    staffDistributionData: [
        { name: '讲师', value: 156 },
        { name: '管理员', value: 68 },
        { name: '客服', value: 32 },
        { name: '运营', value: 22 },
        { name: '其他', value: 8 }
    ],
    passRateTrendData: [
        { month: '1月', rate: 85.2 },
        { month: '2月', rate: 86.8 },
        { month: '3月', rate: 88.5 },
        { month: '4月', rate: 90.2 },
        { month: '5月', rate: 91.8 },
        { month: '6月', rate: 92.5 }
    ],
    orderAmountTrendData: [
        { month: '1月', amount: 386000 },
        { month: '2月', amount: 302000 },
        { month: '3月', amount: 428000 },
        { month: '4月', amount: 501000 },
        { month: '5月', amount: 562000 },
        { month: '6月', amount: 677000 }
    ],
    mapData: [
        { name: '北京', value: 850, students: 12560, lat: 39.92, lng: 116.46 },
        { name: '上海', value: 720, students: 10800, lat: 31.22, lng: 121.48 },
        { name: '广州', value: 680, students: 9560, lat: 23.16, lng: 113.23 },
        { name: '深圳', value: 560, students: 8600, lat: 22.62, lng: 114.07 },
        { name: '成都', value: 480, students: 7200, lat: 30.67, lng: 104.06 },
        { name: '武汉', value: 420, students: 6300, lat: 30.52, lng: 114.31 },
        { name: '杭州', value: 380, students: 5600, lat: 30.26, lng: 120.19 },
        { name: '南京', value: 350, students: 5200, lat: 32.04, lng: 118.78 },
        { name: '重庆', value: 320, students: 4700, lat: 29.59, lng: 106.54 },
        { name: '济南', value: 280, students: 4200, lat: 36.65, lng: 117.00 },
        { name: '西安', value: 260, students: 3800, lat: 34.27, lng: 108.95 },
        { name: '厦门', value: 220, students: 3300, lat: 24.47, lng: 118.10 }
    ]
};

function calculatePassRate(examData) {
    const total = examData.reduce((sum, item) => sum + item.total, 0);
    const weightedSum = examData.reduce((sum, item) => sum + item.total * item.rate, 0);
    return Number((weightedSum / total).toFixed(1));
}

function calculateKPIData() {
    const data = dashboardMockData;
    
    return {
        institutions: data.kpiData.institutions,
        subInstitutionCount: data.mapData.length,
        totalStudents: data.mapData.reduce((sum, item) => sum + item.students, 0),
        totalTeachers: data.kpiData.totalTeachers,
        totalCourses: data.courseCategories.reduce((sum, item) => sum + item.value, 0),
        questionBankCount: data.kpiData.questionBankCount,
        examPassRate: calculatePassRate(data.examPassData),
        totalOrders: data.monthlyOrders.reduce((sum, item) => sum + item.orders, 0),
        totalAmount: data.monthlyOrders.reduce((sum, item) => sum + item.amount, 0),
        certificates: data.kpiData.certificates
    };
}

function getMockData(type) {
    if (type && dashboardMockData[type]) {
        return dashboardMockData[type];
    }
    return dashboardMockData;
}

function loadKPIData() {
    const container = document.getElementById('kpiContainer');
    if (!container) return;
    
    const cards = dashboardMockData.kpiCards;
    const data = calculateKPIData();
    const trends = dashboardMockData.kpiTrends;
    
    let html = '';
    cards.forEach(card => {
        let value = data[card.dataKey];
        let displayValue = '';
        
        if (card.isMoney) {
            displayValue = '¥' + (value / 10000).toFixed(card.decimals);
        } else if (card.isRate) {
            displayValue = value.toFixed(card.decimals) + '%';
        } else {
            displayValue = value.toLocaleString();
        }
        
        const trend = trends[card.dataKey] || { value: '', trend: 'neutral' };
        const trendClass = trend.trend === 'up' ? 'up' : trend.trend === 'down' ? 'down' : '';
        const trendText = trend.value ? (trend.trend === 'up' ? '↑ ' : trend.trend === 'down' ? '↓ ' : '') + trend.value : card.unit;
        
        html += `
            <div class="kpi-card ${card.theme}" id="kpi-${card.id}" onclick="openDetailModal('${card.title}')">
                <div class="kpi-info">
                    <h4>${card.title}</h4>
                    <div class="kpi-number">${displayValue}</div>
                    <span class="trend-badge ${trendClass}">${trendText}</span>
                </div>
                <div class="kpi-icon"><i class="${card.icon}"></i></div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function updateTrendBadge(key, trend) {
    const badges = document.querySelectorAll('.trend-badge');
    let index = 0;
    switch(key) {
        case 'institutions': index = 0; break;
        case 'totalStudents': index = 1; break;
        case 'totalTeachers': index = 2; break;
        case 'totalCourses': index = 3; break;
        case 'questionBankCount': index = 4; break;
        case 'examPassRate': index = 5; break;
        case 'totalOrders': index = 6; break;
        case 'totalAmount': index = 7; break;
    }
    if (badges[index]) {
        badges[index].textContent = (trend.trend === 'up' ? '↑ ' : trend.trend === 'down' ? '↓ ' : '') + trend.value;
        badges[index].className = 'trend-badge ' + trend.trend;
    }
}

function loadRecentStudents() {
    const container = document.querySelector('.recent-student-list');
    if (!container) return;
    
    const students = dashboardMockData.recentStudents;
    let html = '';
    students.forEach((student, index) => {
        html += `
            <div class="recent-student-item" style="animation-delay: ${index * 0.1}s">
                <div class="recent-student-avatar">${student.name.charAt(0)}</div>
                <div class="recent-student-info">
                    <div class="recent-student-name">${student.name}</div>
                    <div class="recent-student-meta">${student.city} · ${student.course}</div>
                </div>
                <span class="recent-student-time">${student.time}</span>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadHotCourses() {
    const container = document.querySelector('.top-course-list');
    if (!container) return;
    
    const courses = dashboardMockData.hotCourses;
    let html = '';
    courses.forEach((course, index) => {
        html += `
            <li class="top-course-item">
                <span class="top-course-rank ${index < 3 ? 'top' + (index + 1) : ''}">${index + 1}</span>
                <div class="top-course-info">
                    <div class="top-course-name">${course.name}</div>
                    <div class="top-course-count">购买人数: ${course.students.toLocaleString()}</div>
                </div>
                <div class="top-course-rate">${course.rate}%</div>
            </li>
        `;
    });
    container.innerHTML = html;
}

function initChartsFromMock() {
    if (typeof echarts !== 'undefined') {
        initPersonnelChart();
        initCourseChart();
        initStudentTrendChart();
        initPassRateChart();
        initOrderAmountChart();
        initOrderTrendChart();
        initMapChart();
    }
}

function initPersonnelChart() {
    const chartEl = document.getElementById('personnelChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.staffDistributionData;
    
    chart.setOption({
        tooltip: { trigger: 'item' },
        legend: { orient: 'vertical', right: '5%', top: 'center', textStyle: { fontSize: 11, color: '#475569' } },
        color: ['#2b6e3c', '#3b82f6', '#8b5cf6', '#f97316', '#64748b'],
        series: [{
            type: 'pie', radius: ['45%', '70%'],
            label: { formatter: '{b}\n{d}%', fontSize: 11, color: '#475569' },
            emphasis: { scale: true, scaleSize: 10, itemStyle: { shadowBlur: 20, shadowColor: 'rgba(22, 101, 52, 0.3)' } },
            data: data.map(item => ({ value: item.value, name: item.name }))
        }]
    });
}

function initCourseChart() {
    const chartEl = document.getElementById('courseChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.courseCategories;
    
    chart.setOption({
        tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e2e8f0', borderWidth: 1, padding: [12, 16], textStyle: { color: '#1e293b', fontSize: 13 } },
        grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
        xAxis: { type: 'category', data: data.map(item => item.name), axisLabel: { fontSize: 11, color: '#475569' }, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisTick: { show: false } },
        yAxis: { type: 'value', axisLabel: { fontSize: 11, color: '#64748b' }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } } },
        color: ['#22c55e'],
        series: [{ name: '课程数', type: 'bar', barWidth: '55%', data: data.map(item => item.value), itemStyle: { borderRadius: [8, 8, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#22c55e' }, { offset: 1, color: '#16a34a' }]) } }]
    });
}

function initStudentTrendChart() {
    const chartEl = document.getElementById('studentTrendChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.studentGrowth;
    
    chart.setOption({
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: { type: 'category', data: data.map(item => item.month), axisLabel: { fontSize: 10 } },
        yAxis: { type: 'value', axisLabel: { fontSize: 10 } },
        color: ['#2b6e3c'],
        series: [{
            name: '新增学员', type: 'line', smooth: true, data: data.map(item => item.value),
            areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(43, 110, 60, 0.3)' }, { offset: 1, color: 'rgba(43, 110, 60, 0.05)' }]) },
            lineStyle: { width: 3 }, itemStyle: { color: '#2b6e3c' }
        }]
    });
}

function initPassRateChart() {
    const chartEl = document.getElementById('passRateChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.passRateTrendData;
    
    chart.setOption({
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e2e8f0', borderWidth: 1, padding: [12, 16], textStyle: { color: '#1e293b', fontSize: 13 }, formatter: '{b}<br/>{a}: {c}%' },
        grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
        xAxis: { type: 'category', data: data.map(item => item.month), axisLabel: { fontSize: 11, color: '#475569' }, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisTick: { show: false } },
        yAxis: { type: 'value', min: 70, max: 100, axisLabel: { fontSize: 11, color: '#64748b', formatter: '{value}%' }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } } },
        color: ['#22c55e'],
        series: [{ name: '通过率', type: 'line', smooth: true, data: data.map(item => item.rate), lineStyle: { width: 3 }, itemStyle: { color: '#22c55e', borderRadius: [4, 4, 0, 0] } }]
    });
}

function initOrderAmountChart() {
    const chartEl = document.getElementById('orderAmountChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.orderAmountTrendData;
    
    chart.setOption({
        tooltip: { trigger: 'axis', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderColor: '#e2e8f0', borderWidth: 1, padding: [12, 16], textStyle: { color: '#1e293b', fontSize: 13 }, formatter: '{b}<br/>订单金额: ¥{c}' },
        grid: { left: '3%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
        xAxis: { type: 'category', data: data.map(item => item.month), axisLabel: { fontSize: 11, color: '#475569' }, axisLine: { lineStyle: { color: '#e2e8f0' } }, axisTick: { show: false } },
        yAxis: { type: 'value', axisLabel: { fontSize: 11, color: '#64748b', formatter: (value) => '¥' + (value / 10000).toFixed(1) + '万' }, axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } } },
        color: ['#f97316'],
        series: [{ name: '订单金额', type: 'bar', barWidth: '50%', data: data.map(item => item.amount), itemStyle: { borderRadius: [6, 6, 0, 0], color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#f97316' }, { offset: 1, color: '#ea580c' }]) } }]
    });
}

function initMapChart() {
    const chartEl = document.getElementById('chinaMap');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const mapData = dashboardMockData.mapData;
    
    chart.setOption({
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: [12, 16],
            textStyle: { color: '#1e293b', fontSize: 13 },
            formatter: function(params) {
                const data = params.data;
                if (data.orgName) {
                    return `<div style="font-weight: 600; margin-bottom: 4px;">${data.orgName}</div>
                            <div>所在城市: ${data.city}</div>
                            <div>学员数量: ${data.students?.toLocaleString() || data.value?.toLocaleString()}人</div>`;
                }
                return `<div style="font-weight: 600; margin-bottom: 4px;">${data.name}</div>
                        <div>学员数量: ${data.students?.toLocaleString() || data.value?.toLocaleString()}人</div>`;
            }
        },
        geo: {
            map: 'china',
            roam: true,
            zoom: 1.2,
            label: { show: true, fontSize: 10, color: '#475569' },
            itemStyle: { areaColor: '#f8fafc', borderColor: '#cbd5e1', borderWidth: 1 },
            emphasis: { itemStyle: { areaColor: '#dcfce7', borderColor: '#22c55e' } }
        },
        series: [{
            name: '分校分布',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: function(value) { return Math.sqrt(value[2]) * 1.2; },
            itemStyle: { color: '#2b6e3c', shadowBlur: 8, shadowColor: 'rgba(43, 110, 60, 0.5)' },
            data: mapData.map(item => ({
                name: item.name + '分校',
                value: [item.lng, item.lat, item.value],
                city: item.name,
                orgName: '叁竹培训' + item.name + '分校',
                students: item.students
            }))
        }, {
            name: '总部',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 28,
            label: { show: true, formatter: '总部', fontSize: 11, fontWeight: 'bold', color: '#dc2626' },
            emphasis: { label: { show: true, formatter: '湖南长沙总部', fontSize: 12 } },
            itemStyle: { color: '#dc2626', shadowBlur: 15, shadowColor: 'rgba(220, 38, 38, 0.7)', borderColor: '#fff', borderWidth: 3 },
            data: [{ name: '湖南长沙总部', value: [112.94, 28.23], province: '湖南省', city: '长沙', orgName: '叁竹培训总部', students: 1500 }]
        }]
    });
}

function initOrderTrendChart() {
    const chartEl = document.getElementById('orderTrendChart');
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    const data = dashboardMockData.monthlyOrders;
    
    chart.setOption({
        tooltip: { 
            trigger: 'axis',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            padding: [12, 16],
            textStyle: { color: '#1e293b', fontSize: 13 }
        },
        legend: { 
            data: ['订单数', '金额(万)'], 
            bottom: '0%',
            textStyle: { fontSize: 11, color: '#475569' },
            itemWidth: 16,
            itemHeight: 8,
            itemGap: 20
        },
        grid: { left: '3%', right: '4%', bottom: '12%', top: '5%', containLabel: true },
        xAxis: { 
            type: 'category', 
            data: data.map(item => item.month), 
            axisLabel: { fontSize: 11, color: '#475569' },
            axisLine: { lineStyle: { color: '#e2e8f0' } },
            axisTick: { show: false }
        },
        yAxis: { 
            type: 'value', 
            axisLabel: { fontSize: 11, color: '#64748b' },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
        },
        color: ['#22c55e', '#4ade80'],
        series: [
            {
                name: '订单数', 
                type: 'line', 
                smooth: true, 
                data: data.map(item => item.orders),
                areaStyle: { 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(34, 197, 94, 0.35)' }, 
                        { offset: 1, color: 'rgba(34, 197, 94, 0.02)' }
                    ]) 
                },
                lineStyle: { width: 3.5, color: '#22c55e' }, 
                itemStyle: { 
                    color: '#22c55e',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 7,
                emphasis: {
                    scale: true,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(34, 197, 94, 0.6)'
                    }
                }
            },
            {
                name: '金额(万)', 
                type: 'line', 
                smooth: true, 
                data: data.map(item => (item.amount / 10000)),
                areaStyle: { 
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: 'rgba(74, 222, 128, 0.3)' }, 
                        { offset: 1, color: 'rgba(74, 222, 128, 0.02)' }
                    ]) 
                },
                lineStyle: { width: 3.5, color: '#4ade80' }, 
                itemStyle: { 
                    color: '#4ade80',
                    borderColor: '#fff',
                    borderWidth: 2
                },
                symbol: 'circle',
                symbolSize: 7,
                emphasis: {
                    scale: true,
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(74, 222, 128, 0.6)'
                    }
                }
            }
        ]
    });
}

function initModalChartsFromMock(title, chartId) {
    const chartEl = document.getElementById(chartId);
    if (!chartEl) return;
    const chart = echarts.init(chartEl);
    
    if (title === '机构人数') {
        const data = dashboardMockData.departmentData;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
            xAxis: { type: 'category', data: data.map(item => item.name), axisLabel: { rotate: 30, fontSize: 11 } },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{ type: 'bar', data: data.map(item => item.value), itemStyle: { borderRadius: [4, 4, 0, 0] } }]
        });
    } else if (title === '子机构个数') {
        const data = dashboardMockData.subInstitutionData;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.name), axisLabel: { rotate: 45, fontSize: 10 } },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{ type: 'bar', data: data.map(item => item.value), itemStyle: { borderRadius: [4, 4, 0, 0] } }]
        });
    } else if (title === '学员总数') {
        const data = dashboardMockData.studentGrowth;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.month) },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{
                type: 'line', smooth: true, data: data.map(item => item.value),
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(43, 110, 60, 0.3)' }, { offset: 1, color: 'rgba(43, 110, 60, 0.05)' }]) }
            }]
        });
    } else if (title === '讲师数量') {
        const data = [{ name: '养老护理员', value: 68 }, { name: '老年人评估师', value: 42 }, { name: '健康照护师', value: 28 }, { name: '营养配餐员', value: 18 }];
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.name) },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{ type: 'bar', data: data.map(item => item.value), itemStyle: { borderRadius: [4, 4, 0, 0] } }]
        });
    } else if (title === '课程总数') {
        const data = dashboardMockData.courseCategories;
        chart.setOption({
            tooltip: { trigger: 'item' },
            color: ['#2b6e3c', '#4ade80', '#86efac', '#bbf7d0', '#dcfce7'],
            series: [{ type: 'pie', radius: ['40%', '70%'], data: data.map(item => ({ value: item.value, name: item.name })) }]
        });
    } else if (title === '题库总量') {
        const data = dashboardMockData.questionBankData;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.type), axisLabel: { rotate: 30, fontSize: 10 } },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{ type: 'bar', data: data.map(item => item.count), itemStyle: { borderRadius: [4, 4, 0, 0] } }]
        });
    } else if (title === '考试通过率') {
        const data = dashboardMockData.examPassData;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.type), axisLabel: { rotate: 30, fontSize: 10 } },
            yAxis: { type: 'value', min: 80, max: 100, axisLabel: { formatter: '{value}%' } },
            color: ['#22c55e', '#8b5cf6'],
            series: [
                { name: '本次通过率', type: 'bar', data: data.map(item => item.rate), itemStyle: { borderRadius: [4, 4, 0, 0] } },
                { name: '上月通过率', type: 'bar', data: data.map(item => item.lastRate), itemStyle: { borderRadius: [4, 4, 0, 0] } }
            ]
        });
    } else if (title === '订单总数') {
        const data = dashboardMockData.monthlyOrders;
        chart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: data.map(item => item.month) },
            yAxis: { type: 'value' },
            color: ['#2b6e3c'],
            series: [{
                type: 'line', smooth: true, data: data.map(item => item.orders),
                areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(43, 110, 60, 0.3)' }, { offset: 1, color: 'rgba(43, 110, 60, 0.05)' }]) }
            }]
        });
    } else if (title === '订单金额' || title === '订单金额（万）') {
        const data = dashboardMockData.orderTypeData;
        chart.setOption({
            tooltip: { trigger: 'item' },
            color: ['#2b6e3c', '#4ade80', '#86efac', '#bbf7d0'],
            series: [{ type: 'pie', radius: ['40%', '70%'], data: data.map(item => ({ value: item.amount, name: item.type })) }]
        });
    }
    
    window.addEventListener('resize', function() { chart.resize(); });
}

function initDashboard() {
    loadKPIData();
    loadRecentStudents();
    loadHotCourses();
    
    setTimeout(function() {
        initChartsFromMock();
    }, 100);
}

document.addEventListener('DOMContentLoaded', initDashboard);

window.getMockData = getMockData;
window.loadKPIData = loadKPIData;
window.initDashboard = initDashboard;