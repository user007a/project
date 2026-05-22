var VRAPI = {
    baseUrl: '/api',
    
    plots: [
        {
            id: 'plot_a1',
            name: 'A1地块',
            variety: '红富士',
            age: 8,
            area: 25,
            status: 'normal',
            yield: 12000,
            fertilizationDate: '2026-05-15',
            diseaseRisk: 'low'
        },
        {
            id: 'plot_a2',
            name: 'A2地块',
            variety: '红富士',
            age: 8,
            area: 22,
            status: 'normal',
            yield: 10500,
            fertilizationDate: '2026-05-14',
            diseaseRisk: 'low'
        },
        {
            id: 'plot_b1',
            name: 'B1地块',
            variety: '嘎啦',
            age: 6,
            area: 20,
            status: 'warning',
            yield: 8000,
            fertilizationDate: '2026-05-12',
            diseaseRisk: 'medium'
        },
        {
            id: 'plot_b2',
            name: 'B2地块',
            variety: '金帅',
            age: 5,
            area: 18,
            status: 'normal',
            yield: 7200,
            fertilizationDate: '2026-05-16',
            diseaseRisk: 'low'
        },
        {
            id: 'plot_c1',
            name: 'C1地块',
            variety: '红富士',
            age: 10,
            area: 30,
            status: 'normal',
            yield: 15000,
            fertilizationDate: '2026-05-13',
            diseaseRisk: 'low'
        },
        {
            id: 'plot_c2',
            name: 'C2地块',
            variety: '国光',
            age: 12,
            area: 25,
            status: 'error',
            yield: 9000,
            fertilizationDate: '2026-05-10',
            diseaseRisk: 'high'
        }
    ],
    
    devices: [
        {
            id: 'device_water1',
            name: '水肥设备A区',
            type: '滴灌系统',
            status: 'online',
            location: 'A1区',
            flowRate: 2.5,
            lastMaintenance: '2026-05-01',
            nextMaintenance: '2026-06-01'
        },
        {
            id: 'device_water2',
            name: '水肥设备B区',
            type: '滴灌系统',
            status: 'online',
            location: 'B1区',
            flowRate: 2.2,
            lastMaintenance: '2026-05-05',
            nextMaintenance: '2026-06-05'
        },
        {
            id: 'device_camera1',
            name: '监控摄像头B1',
            type: '监控设备',
            status: 'online',
            location: 'B1区西北角',
            resolution: '4K',
            lastMaintenance: '2026-04-20',
            nextMaintenance: '2026-07-20'
        },
        {
            id: 'device_camera2',
            name: '监控摄像头C1',
            type: '监控设备',
            status: 'warning',
            location: 'C1区东南角',
            resolution: '4K',
            lastMaintenance: '2026-03-15',
            nextMaintenance: '2026-06-15'
        },
        {
            id: 'device_meteor1',
            name: '气象站',
            type: '气象设备',
            status: 'online',
            location: 'C1区',
            temperature: 26.5,
            humidity: 68,
            windSpeed: 3.2,
            lastMaintenance: '2026-05-10',
            nextMaintenance: '2026-08-10'
        },
        {
            id: 'device_sensor1',
            name: '土壤传感器A1',
            type: '传感器',
            status: 'online',
            location: 'A1区',
            moisture: 45,
            ph: 6.8,
            lastMaintenance: '2026-05-08',
            nextMaintenance: '2026-08-08'
        }
    ],
    
    tasks: [
        {
            id: 'task_pruning',
            name: '夏季修剪',
            type: 'pruning',
            plots: ['A1', 'A2', 'A3'],
            responsible: '李师傅',
            progress: 75,
            status: 'in_progress',
            startTime: '2026-05-01',
            endTime: '2026-05-30',
            description: '夏季修剪主要包括疏果、拉枝、摘心等工作'
        },
        {
            id: 'task_spray',
            name: '病虫害防治',
            type: 'spray',
            plots: ['B1', 'C2'],
            responsible: '王师傅',
            progress: 40,
            status: 'in_progress',
            startTime: '2026-05-18',
            endTime: '2026-05-25',
            description: '针对蚜虫和红蜘蛛进行防治'
        },
        {
            id: 'task_irrigation',
            name: '灌溉作业',
            type: 'irrigation',
            plots: ['A1', 'A2', 'B1', 'B2'],
            responsible: '张师傅',
            progress: 100,
            status: 'completed',
            startTime: '2026-05-15',
            endTime: '2026-05-16',
            description: '春季灌溉作业已完成'
        },
        {
            id: 'task_fertilizer',
            name: '追肥作业',
            type: 'fertilizer',
            plots: ['C1', 'C2'],
            responsible: '赵师傅',
            progress: 60,
            status: 'in_progress',
            startTime: '2026-05-20',
            endTime: '2026-05-28',
            description: '苹果膨大期追肥'
        }
    ],
    
    buildings: [
        {
            id: 'building_office',
            name: '办公楼',
            type: 'office',
            area: 1200,
            floors: 2,
            usage: '办公、会议室',
            status: 'normal'
        },
        {
            id: 'building_storage',
            name: '仓库',
            type: 'storage',
            area: 800,
            floors: 1,
            usage: '农资存放、设备存放',
            status: 'normal'
        },
        {
            id: 'building_workshop',
            name: '加工车间',
            type: 'workshop',
            area: 1500,
            floors: 1,
            usage: '苹果分拣、包装',
            status: 'normal'
        }
    ],
    
    getPlots: function(callback) {
        setTimeout(function() {
            callback(null, {
                code: 200,
                message: 'success',
                data: VRAPI.plots
            });
        }, 300);
    },
    
    getPlotById: function(id, callback) {
        setTimeout(function() {
            var plot = VRAPI.plots.find(function(p) { return p.id === id; });
            if (plot) {
                callback(null, {
                    code: 200,
                    message: 'success',
                    data: plot
                });
            } else {
                callback({ code: 404, message: 'Plot not found' }, null);
            }
        }, 200);
    },
    
    getDevices: function(callback) {
        setTimeout(function() {
            callback(null, {
                code: 200,
                message: 'success',
                data: VRAPI.devices
            });
        }, 300);
    },
    
    getDeviceById: function(id, callback) {
        setTimeout(function() {
            var device = VRAPI.devices.find(function(d) { return d.id === id; });
            if (device) {
                callback(null, {
                    code: 200,
                    message: 'success',
                    data: device
                });
            } else {
                callback({ code: 404, message: 'Device not found' }, null);
            }
        }, 200);
    },
    
    getTasks: function(callback) {
        setTimeout(function() {
            callback(null, {
                code: 200,
                message: 'success',
                data: VRAPI.tasks
            });
        }, 300);
    },
    
    getTaskById: function(id, callback) {
        setTimeout(function() {
            var task = VRAPI.tasks.find(function(t) { return t.id === id; });
            if (task) {
                callback(null, {
                    code: 200,
                    message: 'success',
                    data: task
                });
            } else {
                callback({ code: 404, message: 'Task not found' }, null);
            }
        }, 200);
    },
    
    getBuildings: function(callback) {
        setTimeout(function() {
            callback(null, {
                code: 200,
                message: 'success',
                data: VRAPI.buildings
            });
        }, 300);
    },
    
    getBuildingById: function(id, callback) {
        setTimeout(function() {
            var building = VRAPI.buildings.find(function(b) { return b.id === id; });
            if (building) {
                callback(null, {
                    code: 200,
                    message: 'success',
                    data: building
                });
            } else {
                callback({ code: 404, message: 'Building not found' }, null);
            }
        }, 200);
    },
    
    getAlerts: function(callback) {
        setTimeout(function() {
            var alerts = VRAPI.devices
                .filter(function(d) { return d.status === 'warning' || d.status === 'error'; })
                .map(function(d) {
                    return {
                        id: d.id,
                        type: 'device',
                        message: d.name + '状态异常',
                        level: d.status === 'warning' ? 'warning' : 'error',
                        time: new Date().toISOString()
                    };
                });
            
            var plotAlerts = VRAPI.plots
                .filter(function(p) { return p.status === 'warning' || p.status === 'error'; })
                .map(function(p) {
                    return {
                        id: p.id,
                        type: 'plot',
                        message: p.name + (p.status === 'warning' ? '病虫害风险中等' : '病虫害风险高'),
                        level: p.status,
                        time: new Date().toISOString()
                    };
                });
            
            callback(null, {
                code: 200,
                message: 'success',
                data: alerts.concat(plotAlerts)
            });
        }, 200);
    },
    
    getSceneData: function(sceneId, callback) {
        setTimeout(function() {
            var sceneData = vrHotspotsData.getSceneById(sceneId);
            if (sceneData) {
                callback(null, {
                    code: 200,
                    message: 'success',
                    data: sceneData
                });
            } else {
                callback({ code: 404, message: 'Scene not found' }, null);
            }
        }, 200);
    },
    
    getAllSceneIds: function(callback) {
        setTimeout(function() {
            callback(null, {
                code: 200,
                message: 'success',
                data: vrHotspotsData.getAllSceneIds()
            });
        }, 100);
    }
};