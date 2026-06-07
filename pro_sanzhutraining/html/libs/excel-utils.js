/**
 * Excel工具函数 - 用于导入导出模板
 * 支持中文UTF-8编码，避免乱码
 */

const ExcelUtils = {
    /**
     * 导出数据为Excel格式（CSV）
     * @param {Array} data - 数据数组，每行为一个数组
     * @param {Array} headers - 表头数组
     * @param {string} filename - 文件名（不含扩展名）
     */
    exportToExcel: function(data, headers, filename) {
        // 创建带BOM的CSV内容以支持中文
        let csvContent = '\uFEFF';
        
        // 添加表头
        csvContent += headers.join('\t') + '\n';
        
        // 添加数据行
        data.forEach(row => {
            const escapedRow = row.map(cell => {
                const value = String(cell || '');
                // 处理换行符和制表符
                return value.replace(/\n/g, ' ').replace(/\t/g, ' ');
            });
            csvContent += escapedRow.join('\t') + '\n';
        });
        
        // 创建下载链接
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename + '_' + new Date().toISOString().slice(0, 10) + '.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },
    
    /**
     * 下载导入模板
     * @param {Array} headers - 表头数组
     * @param {string} filename - 文件名（不含扩展名）
     * @param {Array} sampleData - 示例数据（可选）
     */
    downloadImportTemplate: function(headers, filename, sampleData) {
        let csvContent = '\uFEFF';
        
        // 添加表头
        csvContent += headers.join('\t') + '\n';
        
        // 如果有示例数据，添加示例行
        if (sampleData && sampleData.length > 0) {
            sampleData.forEach(row => {
                const escapedRow = row.map(cell => {
                    const value = String(cell || '');
                    return value.replace(/\n/g, ' ').replace(/\t/g, ' ');
                });
                csvContent += escapedRow.join('\t') + '\n';
            });
        }
        
        // 创建下载链接
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', filename + '_模板.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
};

// 暴露到全局
if (typeof window !== 'undefined') {
    window.ExcelUtils = ExcelUtils;
}

// 支持CommonJS导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExcelUtils;
}