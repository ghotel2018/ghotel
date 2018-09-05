package com.ghotel.oss.console.core.utils;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ReadExcelCSV {

	private static final String SPECIAL_CHAR_A = "[^\",//n 　]";
	private static final String SPECIAL_CHAR_B = "[^\",//n]";

	private static final Logger logger = LoggerFactory.getLogger(ReadExcelCSV.class);

	public static List<String[]> readCsvFile(InputStream in) throws Exception {
		ArrayList<String[]> list = null;
		BufferedReader bufferedReader = null;
		try {
			list = new ArrayList<String[]>();
			bufferedReader = new BufferedReader(new InputStreamReader(in, "GB2312"));
			String regExp = getRegExp();
			String strLine = "";
			String str = "";
			while ((strLine = bufferedReader.readLine()) != null) {
				Pattern pattern = Pattern.compile(regExp);
				Matcher matcher = pattern.matcher(strLine);
				List<String> listTemp = new ArrayList<String>();
				while (matcher.find()) {
					String temp = matcher.group();
					str = matcher.group();
					str = str.trim(); // 注意这里获取的子字符串是带分隔符的
					if (str.endsWith(",")) {
						str = str.substring(0, str.length() - 1);
						str = str.trim();
					}
					if (str.startsWith("\"") && str.endsWith("\"")) {
						str = str.substring(1, str.length() - 1);
						if (str.contains("\"\"")) {
							str = str.replaceAll("\"\"", "\"");
						}
					}
					listTemp.add(str);
					if (!temp.endsWith(",")) {
						break;
					}
				}
				list.add((String[]) listTemp.toArray(new String[listTemp.size()]));
			}
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (bufferedReader != null) {
					bufferedReader.close();
				}
			} catch (Exception e) {
				throw e;
			}

		}
		return list;
	}

	// 请注意， 不要在
	public static List<String[]> readCsvFileSimple(InputStream in) throws Exception {
		ArrayList<String[]> list = null;
		BufferedReader bufferedReader = null;
		try {
			list = new ArrayList<String[]>();
			bufferedReader = new BufferedReader(new InputStreamReader(in, "GB2312"));
			String strLine = "";
			while ((strLine = bufferedReader.readLine()) != null) {
				// List<String> listTemp = new ArrayList<String>();
				strLine = strLine.trim(); // 注意这里获取的子字符串是带分隔符的
				list.add(strLine.split(","));
			}
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (bufferedReader != null) {
					bufferedReader.close();
				}
			} catch (Exception e) {
				throw e;
			}

		}
		return list;
	}

	public static List<String[]> readXlsx(InputStream is, String type) throws Exception {
		List<String[]> lists = null;
		try {
			Workbook workbook = null;
			if ("xls".equals(type)) {
				workbook = new HSSFWorkbook(is);
			} else if ("xlsx".equals(type)) {
				workbook = new XSSFWorkbook(is);
			} else {
				return new ArrayList<String[]>();
			}
			// 只获取第一个sheet
			Sheet sheet = workbook.getSheetAt(0);
			if (sheet != null) {
				lists = new ArrayList<String[]>();
				// 循环行Row
				// System.out.println("共有: " + sheet.getPhysicalNumberOfRows() +"记录。");
				for (int rowNum = 0; rowNum <= sheet.getPhysicalNumberOfRows(); rowNum++) {
					Row row = sheet.getRow(rowNum);
					if (row == null || row.getLastCellNum() == -1) {
						continue;
					}
					String[] strs = new String[row.getLastCellNum()];
					for (int cellNum = 0; cellNum <= row.getLastCellNum(); cellNum++) {
						Cell cell = row.getCell(cellNum);
						if (cell == null) {
							continue;
						}
						if (cell.getCellType() == Cell.CELL_TYPE_STRING) {
							strs[cellNum] = cell.getStringCellValue();
						} else if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
							Double b = cell.getNumericCellValue();
							strs[cellNum] = new Long(b.longValue()).toString();
						} else {
							strs[cellNum] = "";// "解析出错: 第"+(rowNum+1)+"行,"+"第"+(cellNum+1)+"列";
						}
					}
					// System.out.println("当前值为:" + strs[0]);
					lists.add(strs);
				}
			}
		} catch (Exception e) {
			throw e;
		} finally {
			try {
				if (is != null) {
					is.close();
				}
			} catch (Exception e) {
				throw e;
			}
		}
		return lists;
	}

	public static List<String> readByExcel2007(InputStream is) throws Exception {

		List<String> list = new ArrayList<String>();
		try {

			HSSFWorkbook workBook = new HSSFWorkbook(is);
			HSSFSheet childSheet = workBook.getSheetAt(0);
			for (int i = 0; i <= childSheet.getPhysicalNumberOfRows(); i++) {
				HSSFRow row = childSheet.getRow(i);
				if (null != row) {
					HSSFCell cell = row.getCell(0);
					cell.setCellType(Cell.CELL_TYPE_STRING);
					// String cellValue = cell.toString().trim();
					String cellValue = cell.getStringCellValue();
					if (i > 0 && null != cell && !"".equals(cellValue)) {
						// System.out.println("row:"+i+" cell:"+cell.getStringCellValue());
						list.add(cell.getStringCellValue());
					}
				}
			}
		} catch (IOException e) {
			logger.error("face error:", e);
		}
		return list;
	}

	public static List<String> readByExcel(InputStream is) throws Exception {
		List<String> list = new ArrayList<String>();
		try {
			XSSFWorkbook workBook = new XSSFWorkbook(is);
			XSSFSheet childSheet = workBook.getSheetAt(0);
			for (int i = 0; i <= childSheet.getLastRowNum(); i++) {
				XSSFRow row = childSheet.getRow(i);
				if (null != row) {
					XSSFCell cell = row.getCell(0);
					cell.setCellType(Cell.CELL_TYPE_STRING);
					// String cellValue = cell.toString().trim();
					String cellValue = cell.getStringCellValue();
					if (i > 0 && null != cell && !"".equals(cellValue)) {
						// System.out.println("row:"+i+" cell:"+cell.getStringCellValue());
						list.add(cell.getStringCellValue());
					}
				}
			}
		} catch (IOException e) {
			logger.error("", e);
		}
		return list;
	}

	private static String getRegExp() {
		StringBuffer strRegExps = new StringBuffer();
		strRegExps.append("\"((");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*[,//n 　])*(");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*\"{2})*)*");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*\"[ 　]*,[ 　]*");
		strRegExps.append("|");
		strRegExps.append(SPECIAL_CHAR_B);
		strRegExps.append("*[ 　]*,[ 　]*");
		strRegExps.append("|\"((");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*[,//n 　])*(");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*\"{2})*)*");
		strRegExps.append(SPECIAL_CHAR_A);
		strRegExps.append("*\"[ 　]*");
		strRegExps.append("|");
		strRegExps.append(SPECIAL_CHAR_B);
		strRegExps.append("*[ 　]*");
		return strRegExps.toString();
	}

	/**
	 * 
	 * 读取Excel的内容，第一维数组存储的是一行中格列的值，二维数组存储的是多少个行
	 * 
	 * @param file
	 *            读取数据的源Excel
	 * 
	 * @param ignoreRows
	 *            读取数据忽略的行数，比喻行头不需要读入 忽略的行数为1
	 * 
	 * @return 读出的Excel中数据的内容
	 * 
	 * @throws FileNotFoundException
	 * 
	 * @throws IOException
	 */

	public static List<String[]> getData(File file, int ignoreRows) throws FileNotFoundException, IOException {
		List<String[]> result = new ArrayList<String[]>();
		int rowSize = 0;
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
		// 打开HSSFWorkbook

		POIFSFileSystem fs = new POIFSFileSystem(in);
		HSSFWorkbook wb = new HSSFWorkbook(fs);
		HSSFCell cell = null;
		for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets(); sheetIndex++) {
			HSSFSheet st = wb.getSheetAt(sheetIndex);
			// 第一行为标题，不取
			for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {
				HSSFRow row = st.getRow(rowIndex);
				if (row == null) {
					continue;
				}
				int tempRowSize = row.getLastCellNum() + 1;
				if (tempRowSize > rowSize) {
					rowSize = tempRowSize;
				}
				String[] values = new String[rowSize];
				Arrays.fill(values, "");
				boolean hasValue = false;
				for (short columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {
					String value = "";
					cell = row.getCell(columnIndex);
					if (cell != null) {
						// 注意：一定要设成这个，否则可能会出现乱码
						// cell.setEncoding(HSSFCell.ENCODING_UTF_16);
						switch (cell.getCellType()) {
						case HSSFCell.CELL_TYPE_STRING:
							value = cell.getStringCellValue();
							break;
						case HSSFCell.CELL_TYPE_NUMERIC:
							if (HSSFDateUtil.isCellDateFormatted(cell)) {
								Date date = cell.getDateCellValue();
								if (date != null) {
									value = new SimpleDateFormat("yyyy-MM-dd").format(date);
								} else {
									value = "";
								}
							} else {
								value = new DecimalFormat("0").format(cell.getNumericCellValue());
							}
							break;
						case HSSFCell.CELL_TYPE_FORMULA:
							// 导入时如果为公式生成的数据则无值
							if (!cell.getStringCellValue().equals("")) {
								value = cell.getStringCellValue();
							} else {
								value = cell.getNumericCellValue() + "";
							}
							break;
						case HSSFCell.CELL_TYPE_BLANK:
							break;
						case HSSFCell.CELL_TYPE_ERROR:
							value = "";
							break;
						case HSSFCell.CELL_TYPE_BOOLEAN:
							value = (cell.getBooleanCellValue() == true ? "Y" : "N");
							break;
						default:
							value = "";
						}
					}
					if (columnIndex == 0 && value.trim().equals("")) {
						break;
					}
					values[columnIndex] = rightTrim(value);
					hasValue = true;
				}
				if (hasValue) {
					result.add(values);
				}
			}
		}
		in.close();
		// String[][] returnArray = new String[result.size()][rowSize];
		// for (int i = 0; i < returnArray.length; i++) {
		// returnArray[i] = (String[]) result.get(i);
		// }
		// return returnArray;
		return result;
	}

	/**
	 * 
	 * 去掉字符串右边的空格
	 * 
	 * @param str
	 *            要处理的字符串
	 * 
	 * @return 处理后的字符串
	 */

	public static String rightTrim(String str) {
		if (str == null) {
			return "";
		}
		int length = str.length();
		for (int i = length - 1; i >= 0; i--) {
			if (str.charAt(i) != 0x20) {
				break;
			}
			length--;
		}
		return str.substring(0, length);

	}

	public static void main(String args[]) {

		try {
			readXlsx(new FileInputStream(new File("E:/uploadTemp/wangsiming_1485095669051.xlsx")), "xlsx");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
