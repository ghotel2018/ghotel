package com.ghotel.portal;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections.ListUtils;

public class Test {
	public static void main(String[] args) {
		Integer a = 1;
		Integer c = 2;
		System.out.println(Optional.ofNullable(a).map((b) -> {
			return "all";
		}).orElse("test"));

		List<Integer> test = new ArrayList<Integer>();
		for (int i = 0; i < 10; i++) {
			test.add(i);
		}
		System.out.println(test.subList(1, 8));
	}
}
