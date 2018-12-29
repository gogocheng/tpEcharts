<?php
/**
 * Created by PhpStorm.
 * User: lining
 * Date: 2018/12/29
 * Time: 15:27
 */

namespace app\index\controller;


use think\Controller;

class Data extends Controller
{
    /**
     * description   页面展示
     * @return mixed
     */
    public function index ()
    {
        return $this -> fetch();
    }

    public function show ()
    {
        if (request() -> isGet()) {
            //todo  获取数据库数据，传值给前端ECharts
            $data = [];
            return $data;
        }
    }
}