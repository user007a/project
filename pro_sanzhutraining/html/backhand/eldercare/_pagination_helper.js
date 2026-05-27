const fs = require('fs');
const path = require('path');
const dir = 'D:/dev/GitHub/project/pro_sanzhutraining/html/backhand/eldercare';

// Pagination JS template for table-based pages
function getTablePaginationJS() {
    return `
    // 分页逻辑
    const PAGE_SIZE = 10;
    let currentPage = 1;
    const rows = document.querySelectorAll('tbody tr[data-row]');
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / PAGE_SIZE);

    function renderPagination(page) {
        currentPage = page;
        rows.forEach((row) => {
            const rowNum = parseInt(row.getAttribute('data-row'));
            if (rowNum > (page - 1) * PAGE_SIZE && rowNum <= page * PAGE_SIZE) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        const infoEl = document.getElementById('pageInfo');
        if (infoEl) infoEl.textContent = '第 ' + page + ' / ' + totalPages + ' 页，共 ' + totalRows + ' 条';
        const paginationBtns = document.getElementById('paginationBtns');
        if (paginationBtns) {
            let html = '';
            html += '<button onclick="renderPagination(' + (page - 1) + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (page === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '" ' + (page === 1 ? 'disabled' : '') + '>上一页</button>';
            for (let i = 1; i <= totalPages; i++) {
                html += '<button onclick="renderPagination(' + i + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (i === page ? 'bg-[#1890FF] text-white border-[#1890FF]' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '">' + i + '</button>';
            }
            html += '<button onclick="renderPagination(' + (page + 1) + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (page === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '" ' + (page === totalPages ? 'disabled' : '') + '>下一页</button>';
            paginationBtns.innerHTML = html;
        }
    }
    renderPagination(1);`;
}

// Pagination HTML template
function getPaginationHTML() {
    return `                <!-- 分页 -->
                <div class="px-6 py-4 border-t flex items-center justify-between">
                    <span id="pageInfo" class="text-sm text-gray-500">第 1 / X 页，共 Y 条</span>
                    <div id="paginationBtns" class="flex items-center gap-1"></div>
                </div>`;
}

// === 1. teacher-list.html ===
console.log('Processing teacher-list.html...');
let tContent = fs.readFileSync(path.join(dir, 'teacher-list.html'), 'utf-8');

// Add data-row to tbody tr elements
let tbodyStart = tContent.indexOf('<tbody class="divide-y divide-gray-50">');
let tbodyEnd = tContent.indexOf('</tbody>');
if (tbodyStart > 0 && tbodyEnd > 0) {
    let tbodySection = tContent.substring(tbodyStart, tbodyEnd);
    let rowNum = 0;
    tbodySection = tbodySection.replace(/<tr class/g, () => {
        rowNum++;
        return '<tr data-row="' + rowNum + '" class';
    });
    tContent = tContent.substring(0, tbodyStart) + tbodySection + tContent.substring(tbodyEnd);
    console.log('  Added data-row to', rowNum, 'rows');
}

// Replace static pagination
const oldTeacherPag = `                <!-- 分页 -->
                <div class="px-6 py-4 border-t flex items-center justify-between">
                    <span class="text-sm text-gray-500">共 23 条记录</span>
                    <div class="flex items-center gap-1">
                        <button class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-400 cursor-not-allowed">上一页</button>
                        <button class="px-3 py-1.5 text-sm bg-[#1890FF] text-white border border-[#1890FF] rounded-lg">1</button>
                        <button class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">2</button>
                        <button class="px-3 py-1.5 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">下一页</button>
                    </div>
                </div>`;

tContent = tContent.replace(oldTeacherPag, getPaginationHTML());

// Add pagination JS before </script>
tContent = tContent.replace('    </script>', getTablePaginationJS() + '\n    </script>');

fs.writeFileSync(path.join(dir, 'teacher-list.html'), tContent, 'utf-8');
console.log('  teacher-list.html done!');

// === 2. category-list.html ===
console.log('Processing category-list.html...');
let cContent = fs.readFileSync(path.join(dir, 'category-list.html'), 'utf-8');

// Add data-row to tbody tr elements
let cTbodyStart = cContent.indexOf('<tbody class="divide-y divide-gray-50">');
let cTbodyEnd = cContent.indexOf('</tbody>');
if (cTbodyStart > 0 && cTbodyEnd > 0) {
    let cTbodySection = cContent.substring(cTbodyStart, cTbodyEnd);
    let cRowNum = 0;
    cTbodySection = cTbodySection.replace(/<tr class/g, () => {
        cRowNum++;
        return '<tr data-row="' + cRowNum + '" class';
    });
    cContent = cContent.substring(0, cTbodyStart) + cTbodySection + cContent.substring(cTbodyEnd);
    console.log('  Added data-row to', cRowNum, 'rows');
}

// Add pagination HTML after the table container (before </main>)
// Find the closing of the bg-white rounded-xl div after the table
const catTableEnd = cContent.indexOf('            </div>\n        </main>');
if (catTableEnd > 0) {
    // Find the exact position - we need to add pagination before the closing </div> of the white card
    // The structure is: <div class="bg-white rounded-xl...">...<table>...</table></div></main>
    // We need to add pagination between </table></div> and </div></main>

    // Find the position just before the closing </div> of the bg-white container
    // The table ends with </table></div>\n            </div>\n        </main>
    // We need to insert pagination between the overflow-x-auto div close and the bg-white div close

    // Look for: </table>\n                </div>\n            </div>\n        </main>
    const tableCloseIdx = cContent.indexOf('</table>');
    if (tableCloseIdx > 0) {
        // After </table> there's </div> (overflow-x-auto) then we add pagination before the bg-white </div>
        const afterTable = cContent.substring(tableCloseIdx);
        // Find the pattern: </table>\n                </div>\n            </div>
        const pattern = '</table>\n                </div>\n            </div>';
        const patternIdx = cContent.indexOf(pattern, tableCloseIdx);
        if (patternIdx > 0) {
            const insertPos = patternIdx + pattern.length - '</div>'.length; // Before the last </div> of bg-white
            // Actually, we want pagination INSIDE the bg-white container, after the overflow-x-auto div
            // The structure is:
            // <div class="bg-white...">  (outer)
            //   <div class="px-6...">...</div>  (header)
            //   <div class="overflow-x-auto"><table>...</table></div>  (table)
            //   <!-- pagination goes here -->
            // </div>  (close outer)
            const insertAfter = patternIdx + '</table>\n                </div>\n'.length;
            cContent = cContent.substring(0, insertAfter) + '\n' + getPaginationHTML() + '\n            </div>\n        </main>';
            // Wait, this replaces too much. Let me be more precise.
            // Actually the original content after table is:
            // </table>
            //                </div>
            //            </div>
            //        </main>
            // I need to insert pagination between </div> (overflow-x-auto) and </div> (bg-white)
        }
    }
}

// Let me take a simpler approach - replace the closing section
const catOldEnding = `                </div>
            </div>
        </main>
    </div>

    <!-- 编辑/新建分类弹窗 -->`;

const catNewEnding = `                </div>
${getPaginationHTML()}
            </div>
        </main>
    </div>

    <!-- 编辑/新建分类弹窗 -->`;

cContent = cContent.replace(catOldEnding, catNewEnding);

// Add pagination JS before </script>
cContent = cContent.replace('    </script>', getTablePaginationJS() + '\n    </script>');

fs.writeFileSync(path.join(dir, 'category-list.html'), cContent, 'utf-8');
console.log('  category-list.html done!');

// === 3. slider-list.html ===
console.log('Processing slider-list.html...');
let sContent = fs.readFileSync(path.join(dir, 'slider-list.html'), 'utf-8');

// Add data-row to tbody tr elements
let sTbodyStart = sContent.indexOf('<tbody class="divide-y divide-gray-100">');
if (sTbodyStart < 0) sTbodyStart = sContent.indexOf('<tbody');
let sTbodyEnd = sContent.indexOf('</tbody>');
if (sTbodyStart > 0 && sTbodyEnd > 0) {
    let sTbodySection = sContent.substring(sTbodyStart, sTbodyEnd);
    let sRowNum = 0;
    sTbodySection = sTbodySection.replace(/<tr class/g, () => {
        sRowNum++;
        return '<tr data-row="' + sRowNum + '" class';
    });
    sContent = sContent.substring(0, sTbodyStart) + sTbodySection + sContent.substring(sTbodyEnd);
    console.log('  Added data-row to', sRowNum, 'rows');
}

// Add pagination HTML after the table container
// The structure is: ...</table></div></div></main>
const sliderOldEnding = `</tbody></table></div>
            </div>
        </main>`;

const sliderNewEnding = `</tbody></table></div>
${getPaginationHTML()}
            </div>
        </main>`;

sContent = sContent.replace(sliderOldEnding, sliderNewEnding);

// Add pagination JS before </body>
const sliderPaginationJS = `
    <script>
    ${getTablePaginationJS()}
    </script>`;

sContent = sContent.replace('</body>', sliderPaginationJS + '\n</body>');

fs.writeFileSync(path.join(dir, 'slider-list.html'), sContent, 'utf-8');
console.log('  slider-list.html done!');

// === 4. certificate-list.html (card layout) ===
console.log('Processing certificate-list.html...');
let certContent = fs.readFileSync(path.join(dir, 'certificate-list.html'), 'utf-8');

// For certificate-list.html, cards are dynamically generated by JS
// We need to:
// 1. Modify renderCards to add data-card attributes
// 2. Add pagination HTML after the cards grid
// 3. Add pagination JS that works with data-card

// Add pagination HTML after the noResult div
const certOldNoResult = `            <!-- 无结果提示 -->
            <div id="noResult" class="hidden text-center py-16">
                <span class="iconify text-5xl text-gray-300 mx-auto" data-icon="ri:search-eye-line"></span>
                <p class="text-gray-400 mt-4 text-sm">未找到匹配的证书查询入口</p>
            </div>
        </main>`;

const certNewNoResult = `            <!-- 无结果提示 -->
            <div id="noResult" class="hidden text-center py-16">
                <span class="iconify text-5xl text-gray-300 mx-auto" data-icon="ri:search-eye-line"></span>
                <p class="text-gray-400 mt-4 text-sm">未找到匹配的证书查询入口</p>
            </div>

            <!-- 分页 -->
            <div id="certPagination" class="mt-6 px-6 py-4 bg-white rounded-xl border shadow-sm flex items-center justify-between">
                <span id="pageInfo" class="text-sm text-gray-500">第 1 / X 页，共 Y 条</span>
                <div id="paginationBtns" class="flex items-center gap-1"></div>
            </div>
        </main>`;

certContent = certContent.replace(certOldNoResult, certNewNoResult);

// Now modify the JS - replace the entire script section
const certOldScript = `    <script>
    // 12个证书查询卡片数据
    const certCards = [`;

// We need to add data-card attribute in renderCards and add pagination logic
// Replace the renderCards function
const oldRenderCards = `    function renderCards(data) {
        grid.innerHTML = '';
        const noResult = document.getElementById('noResult');

        if(data.length === 0) {
            noResult.classList.remove('hidden');
            return;
        }
        noResult.classList.add('hidden');

        data.forEach(card => {
            const el = document.createElement('a');
            el.href = card.link;
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
            el.className = \`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 border-l-4 \${card.borderColor} group relative block\`;
            el.innerHTML = \`
                <div class="relative z-10 h-full flex flex-col justify-between min-h-[180px]">
                    <div>
                        <div class="w-10 h-10 \${card.iconBg} rounded-lg flex items-center justify-center mb-4">
                            <span class="iconify text-xl \${card.iconColor}" data-icon="\${card.icon}"></span>
                        </div>
                        <h4 class="text-base font-bold mb-2 leading-snug text-gray-900">\${card.title}</h4>
                        <p class="text-gray-500 text-sm leading-relaxed">\${card.desc}</p>
                    </div>
                    <div class="flex items-center gap-2 mt-6 text-sm font-semibold \${card.btnColor} \${card.btnBg} rounded-lg px-3 py-2 w-fit group-hover:opacity-80 transition-opacity">
                        前往查询 <span class="iconify group-hover:translate-x-1 transition-transform" data-icon="ri:arrow-right-line"></span>
                    </div>
                </div>
            \`;
            grid.appendChild(el);
        });
    }`;

const newRenderCards = `    function renderCards(data) {
        grid.innerHTML = '';
        const noResult = document.getElementById('noResult');

        if(data.length === 0) {
            noResult.classList.remove('hidden');
            document.getElementById('certPagination').style.display = 'none';
            return;
        }
        noResult.classList.add('hidden');
        document.getElementById('certPagination').style.display = '';

        data.forEach((card, index) => {
            const el = document.createElement('a');
            el.href = card.link;
            el.target = '_blank';
            el.rel = 'noopener noreferrer';
            el.setAttribute('data-card', index + 1);
            el.className = \`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 p-6 border-l-4 \${card.borderColor} group relative block\`;
            el.innerHTML = \`
                <div class="relative z-10 h-full flex flex-col justify-between min-h-[180px]">
                    <div>
                        <div class="w-10 h-10 \${card.iconBg} rounded-lg flex items-center justify-center mb-4">
                            <span class="iconify text-xl \${card.iconColor}" data-icon="\${card.icon}"></span>
                        </div>
                        <h4 class="text-base font-bold mb-2 leading-snug text-gray-900">\${card.title}</h4>
                        <p class="text-gray-500 text-sm leading-relaxed">\${card.desc}</p>
                    </div>
                    <div class="flex items-center gap-2 mt-6 text-sm font-semibold \${card.btnColor} \${card.btnBg} rounded-lg px-3 py-2 w-fit group-hover:opacity-80 transition-opacity">
                        前往查询 <span class="iconify group-hover:translate-x-1 transition-transform" data-icon="ri:arrow-right-line"></span>
                    </div>
                </div>
            \`;
            grid.appendChild(el);
        });
        renderCertPagination(1);
    }`;

certContent = certContent.replace(oldRenderCards, newRenderCards);

// Replace filterCards to include pagination after filtering
const oldFilterCards = `    // 搜索过滤
    function filterCards() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        if(!query) {
            renderCards(certCards);
            return;
        }
        const filtered = certCards.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.desc.toLowerCase().includes(query) ||
            c.keyword.toLowerCase().includes(query)
        );
        renderCards(filtered);
    }`;

const newFilterCards = `    // 搜索过滤
    function filterCards() {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        if(!query) {
            renderCards(certCards);
            return;
        }
        const filtered = certCards.filter(c =>
            c.title.toLowerCase().includes(query) ||
            c.desc.toLowerCase().includes(query) ||
            c.keyword.toLowerCase().includes(query)
        );
        renderCards(filtered);
    }

    // 卡片分页逻辑
    const CERT_PAGE_SIZE = 10;
    let certCurrentPage = 1;

    function renderCertPagination(page) {
        const cards = document.querySelectorAll('[data-card]');
        const totalCards = cards.length;
        const totalPages = Math.ceil(totalCards / CERT_PAGE_SIZE);
        certCurrentPage = page;
        cards.forEach((card) => {
            const cardNum = parseInt(card.getAttribute('data-card'));
            if (cardNum > (page - 1) * CERT_PAGE_SIZE && cardNum <= page * CERT_PAGE_SIZE) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
        const infoEl = document.getElementById('pageInfo');
        if (infoEl) infoEl.textContent = '第 ' + page + ' / ' + totalPages + ' 页，共 ' + totalCards + ' 条';
        const paginationBtns = document.getElementById('paginationBtns');
        if (paginationBtns) {
            let html = '';
            html += '<button onclick="renderCertPagination(' + (page - 1) + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (page === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '" ' + (page === 1 ? 'disabled' : '') + '>上一页</button>';
            for (let i = 1; i <= totalPages; i++) {
                html += '<button onclick="renderCertPagination(' + i + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (i === page ? 'bg-[#1890FF] text-white border-[#1890FF]' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '">' + i + '</button>';
            }
            html += '<button onclick="renderCertPagination(' + (page + 1) + ')" class="px-3 py-1.5 text-sm border rounded-lg ' + (page === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-200 text-gray-600 hover:bg-gray-50') + '" ' + (page === totalPages ? 'disabled' : '') + '>下一页</button>';
            paginationBtns.innerHTML = html;
        }
    }`;

certContent = certContent.replace(oldFilterCards, newFilterCards);

fs.writeFileSync(path.join(dir, 'certificate-list.html'), certContent, 'utf-8');
console.log('  certificate-list.html done!');

console.log('\nAll files processed successfully!');
