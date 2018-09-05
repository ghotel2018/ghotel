package com.ghotel.oss.console.core.utils;

import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;
/**
 * DES加密处理工具类.主要用来对数据进行DES加密/解密操作
 * 
 */
public class DesEncryptUtil {
	/**
	 * DES算法名称
	 */
	private final static String DES_ALGORITHM_NAME = "DES";
	/**
	 * 默认的DES算法转换方式
	 */
	private final static String DES_ALGORITHM_TRANSFORMATION_DEFAULT = "DES/ECB/PKCS5Padding";
     private static final char[] DIGITS = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e','f' };
	/**
	 * 根据指定密钥，对数据DES加密，返回16进制字符串数据<br>
	 * 默认转换模式transformation为：DES/ECB/PKCS5Padding
	 * 
	 * @param toEncryptData
	 *            需要加密的数据
	 * @param keyData
	 *            密钥数据内容, 使用该数据的byte[]缓冲区前 8 个字节作为密钥
	 * @return 返回加密后的数据，以16进制字符串形式表示 @
	 * 
	 */
	public static String encryptToHex(byte[] toEncryptData, String keyData) {
		byte[] encryptedData = doEncrypt(getKeyByData(keyData), toEncryptData,DES_ALGORITHM_TRANSFORMATION_DEFAULT);
		if (null == encryptedData) {
			return "";
		}
		return bytesToHex(encryptedData, 0, encryptedData.length);
	}
	/**
	 * 指定密钥和转换方式，进行数据加密
	 * 
	 * @param key
	 *            密钥
	 * @param toEncryptData
	 *            要加密的数据
	 * @param transformation
	 *            转换的名称，例如 DES/CBC/PKCS5Padding。有关标准转换名称的信息，请参见 Java Cryptography Architecture Reference Guide 的附录 A。
	 * @return 加密后的数据
	 */
	public static byte[] doEncrypt(Key key, byte[] toEncryptData, String transformation) {
		if (null == toEncryptData) {
			return null;
		}
		// Get a cipher object
		Cipher cipher = getCipher(key, Cipher.ENCRYPT_MODE, transformation);
		// Encrypt
		byte[] encryptedData = null;
		try {
			encryptedData = cipher.doFinal(toEncryptData);
		} catch (IllegalBlockSizeException e) {
		} catch (BadPaddingException e) {
		}
		return encryptedData;
	}
	/**
	 * 获取Cipher加密和解密对象
	 * 
	 * @param key
	 *            密钥
	 * @param cipherMode
	 *            此 Cipher的操作模式（为以下之一：ENCRYPT_MODE、DECRYPT_MODE、WRAP_MODE 或 UNWRAP_MODE）
	 * @param transformation
	 *            转换的名称，例如 DES/CBC/PKCS5Padding。有关标准转换名称的信息，请参见 Java Cryptography Architecture Reference Guide 的附录 A。
	 * @return
	 */
	public static Cipher getCipher(Key key, int cipherMode, String transformation) {
		Cipher cipher = null;
		try {
			cipher = Cipher.getInstance(transformation);
		} catch (NoSuchAlgorithmException e) {
		} catch (NoSuchPaddingException e) {
		}
		try {
			cipher.init(cipherMode, key);
		} catch (InvalidKeyException e) {
		}
		return cipher;
	}
	/**
	 * 根据指定密钥，对DES加密数据进行解密
	 * 
	 * @pram encryptedDataHex 加密字符串(十六进制)
	 * @param keyData
	 *            密钥
	 * @return 解密字符串
	 * @throws Throwable 
	 * 
	 */
	public static String decrypt(String encryptedDataHex, String keyData) throws Throwable {
		if (encryptedDataHex == null || encryptedDataHex.length() == 0){
			return "";
		}
		String decryptedHexStr = DesEncryptUtil.decryptToHex(toBytes(encryptedDataHex), keyData);
		return hexToStr(decryptedHexStr);
	}
	/**
	 * 根据指定的密钥数据内容，对数据进行DES解密，并返回16进制字符串数据<br>
	 * 默认转换模式transformation为：DES/ECB/PKCS5Padding
	 * 
	 * @param toDecryptData
	 *            要解密的数据
	 * @param keyData
	 *            DES密钥数据，使用该数据的byte[]缓冲区前 8 个字节作为密钥
	 * @return 返回解密后的数据，以16进制字符串形式表示 @
	 * 
	 */
	public static String decryptToHex(byte[] toDecryptData, String keyData) {
		byte[] decryptedData = doDecrypt(getKeyByData(keyData), toDecryptData,
				DES_ALGORITHM_TRANSFORMATION_DEFAULT);
		if (null == decryptedData) {
			return "";
		}
		return bytesToHex(decryptedData, 0, decryptedData.length);
	}
	/**
	 * 指定密钥和转换方式，进行数据解密
	 * 
	 * @param key
	 *            密钥
	 * @param toDecryptData
	 *            要解密的数据
	 * @param transformation
	 *            * 转换的名称，例如 DES/CBC/PKCS5Padding。有关标准转换名称的信息，请参见 Java Cryptography Architecture Reference Guide 的附录 A。
	 * @return 解密后的数据
	 * @since 
	 */
	public static byte[] doDecrypt(Key key, byte[] toDecryptData, String transformation) {
		if (null == toDecryptData) {
			return null;
		}
		// Get a cipher object
		Cipher cipher = getCipher(key, Cipher.DECRYPT_MODE, transformation);
		// Decrypt
		byte[] decryptedData = null;
		try {
			decryptedData = cipher.doFinal(toDecryptData);
		} catch (IllegalBlockSizeException e) {
		} catch (BadPaddingException e) {
		}
		return decryptedData;
	}
	/**
	 * 根据指定的算法名称和密钥规范获取密钥
	 * 
	 * @param algorithm
	 *            所请求的秘密密钥算法的标准名称, 如"DES"。有关标准算法名称的信息，请参阅 Java Cryptography Architecture Reference Guide 中的附录 A。
	 * @param keySpec
	 *            组成加密密钥的密钥内容的（透明）规范
	 * @return
	 */
	public static SecretKey getKey(String algorithm, KeySpec keySpec) {
		SecretKeyFactory keyFactory = null;
		try {
			keyFactory = SecretKeyFactory.getInstance(algorithm);
		} catch (NoSuchAlgorithmException e) {
		}
		try {
			return keyFactory.generateSecret(keySpec);
		} catch (InvalidKeySpecException e) {
		}
		return null;
	}
	/**
	 * 根据密钥数据生成DES密钥
	 * 
	 * @param keyData
	 *            DES密钥数据，使用该数据的byte[]缓冲区前 8 个字节作为密钥
	 * @return DES密钥
	 * 
	 */
	public static SecretKey getKeyByData(String keyData) {
		DESKeySpec desKeySpec = null;
		try {
			desKeySpec = new DESKeySpec(keyData.getBytes());
		} catch (InvalidKeyException e) {
			e.printStackTrace();
		}
		return getKey(DES_ALGORITHM_NAME, desKeySpec);
	}
/**
	 * 将给定的字节数组用十六进制字符串表示.
	 */
	public static String toString(byte[] data) {
		if (data == null) {
			return "null!";
		}
		int l = data.length;
		char[] out = new char[l << 1];
		// two characters form the hex value.
		for (int i = 0, j = 0; i < l; i++) {
			out[j++] = DIGITS[(0xF0 & data[i]) >>> 4];
			out[j++] = DIGITS[0x0F & data[i]];
		}
		return new String(out);
	}
	/**
	 * 把输入的字节树组，逐字节转化为其16进制的文本描述形式
	 * 
	 * @param buf
	 *            输入的字节树组
	 * @param off
	 *            需要转化的开始位置
	 * @param len
	 *            需要转化的结束位置
	 * @return 转化结果
	 */
	public final static String bytesToHex(byte[] buf, int off, int len) {
		char[] out = new char[len * 2];
		for (int i = 0, j = 0; i < len; i++) {
			int a = buf[off++];
			out[j++] = DIGITS[(a >>> 4) & 0X0F];
			out[j++] = DIGITS[a & 0X0F];
		}
		return (new String(out));
	}
	/**
	 * 
	 * @param ch
	 * @param index
	 * @return
	 */
	static int toDigit(char ch, int index) {
		int digit = Character.digit(ch, 16);
		if (digit == -1) {
			throw new RuntimeException("Illegal hexadecimal charcter " + ch + " at index " + index);
		}
		return digit;
	}
	public static String hexToStr(String hex) {
		return new String(toBytes(hex));
	}
	/**
	 * 将给定的十六进制字符串转化为字节数组. <BR>
	 * 与<code>toString(byte[] data)</code>作用相反.
	 * 
	 * @throws RuntimeException
	 *             当给定十六进制字符串的长度为奇数时或给定字符串包含非十六进制字符.
	 * @see #toString(byte[])
	 */
	public static byte[] toBytes(String str) {
		if (str == null) {
			return null;
		}
		char[] data = str.toCharArray();
		int len = data.length;
		if ((len & 0x01) != 0) {
			throw new RuntimeException("Odd number of characters!");
		}
		byte[] out = new byte[len >> 1];
		// two characters form the hex value.
		for (int i = 0, j = 0; j < len; i++) {
			int f = toDigit(data[j], j) << 4;
			j++;
			f = f | toDigit(data[j], j);
			j++;
			out[i] = (byte) (f & 0xFF);
		}
		return out;
	}
	
	/**
	 * 将给定的字节数组用十六进制字符串表示.
	 */
	public static String bytesToHexString(byte[] data) {
		if (data == null) {
			return "null!";
		}
		int l = data.length;
		char[] out = new char[l << 1];
		// two characters form the hex value.
		for (int i = 0, j = 0; i < l; i++) {
			out[j++] = DIGITS[(0xF0 & data[i]) >>> 4];
			out[j++] = DIGITS[0x0F & data[i]];
		}
		return new String(out);
	}
}
