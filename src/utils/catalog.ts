import productsPages from '../../data/products_pages.json';
import pagesImages from '../../data/pages_images.json';

const productsMap: Record<string, number> = productsPages;
const pagesMap: Record<string, string> = pagesImages;

// 归一化映射表：存储 { 归一化后的键: 原始真实键 }
// 例如: { "ALSH02C": "ALS-H02C", "XWB00P": "XWB-00P" }
const normalizedProductsMap: Record<string, string> = {};

/**
 * 归一化处理函数：
 * 1. 转换为大写
 * 2. 去除所有横杠、斜杠、空格等非字母数字字符
 * 3. 统一将字母 O 替换为数字 0，将字母 I 替换为数字 1
 */
function normalizeString(str: string): string {
  return str
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .replace(/O/g, '0')
    .replace(/I/g, '1');
}

// 初始化归一化字典
Object.keys(productsMap).forEach((realKey) => {
  const normKey = normalizeString(realKey);
  normalizedProductsMap[normKey] = realKey;
});

/**
 * 根据用户的输入（产品编号或页码）检索对应的产品图片文件名
 * 支持模糊容错：忽略大小写、忽略空格/横杠/斜杠、兼容 0/O 及 1/I 混淆
 * @param query 用户输入的字符串（例如 "ALS-H02C"、"alsh02c"、"XWB-OOP" 或 "210"）
 * @returns 对应的图片文件名（如 "209,210.jpg"），若未找到则返回 null
 */
export function findImageByQuery(query: string): string | null {
  if (!query) return null;

  const cleanQuery = query.trim();

  // 1. 检查是否输入的是纯数字（页码直接检索）
  if (/^\d+$/.test(cleanQuery)) {
    const pageNum = parseInt(cleanQuery, 10);
    return pagesMap[pageNum] || null;
  }

  // 2. 第一级检索：精确匹配（去空格转大写）
  const exactKey = cleanQuery.toUpperCase();
  let pageNum = productsMap[exactKey];
  if (pageNum !== undefined) {
    return pagesMap[pageNum] || null;
  }

  // 3. 第二级检索：归一化模糊检索（容错横杠、0/O、1/I）
  const normQuery = normalizeString(cleanQuery);
  const matchedRealKey = normalizedProductsMap[normQuery];
  if (matchedRealKey) {
    pageNum = productsMap[matchedRealKey];
    if (pageNum !== undefined) {
      return pagesMap[pageNum] || null;
    }
  }

  return null;
}

