package com.example.demo.common;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

/**
 * @Author le
 * @Date 2022/9/27 9:56
 * @Version 1.0
 */
@Data
public class CommonResult {
    private Integer code;//100表示请求失败，200表示成功
    private String msg;
    //用户要返回给浏览器的数据
    private Map<String, Object> getExtend = new HashMap<>();

    public static CommonResult finalResult(Integer num) {
        CommonResult result = new CommonResult();
        if (num != 0) {
            result.setCode(200);
            result.setMsg("处理成功");
            return result;
        }
        result.setCode(100);
        result.setMsg("处理失败");
        return result;
    }

    public static CommonResult success() {
        CommonResult result = new CommonResult();
        result.setCode(200);
        result.setMsg("处理成功");
        return result;
    }

    public static CommonResult fail() {
        CommonResult result = new CommonResult();
        result.setCode(100);
        result.setMsg("处理失败");
        return result;
    }

    //用来添加发送给浏览器的数据
    public CommonResult add(String key, Object value) {
        this.getExtend.put(key, value);
        return this;
    }

}
