---
title: PostgreSQL 常用函数
date: '2021-06-07'
sidebar: 'auto'
categories:
- 后端
tags:
- DB
publish: true
---

### 聚合函数
- COUNT 函数：用于计算数据库表中的行数。
- MAX 函数：用于查询某一特定列中最大值。
- MIN 函数：用于查询某一特定列中最小值。
- AVG 函数：用于计算某一特定列中平均值。
- SUM 函数：用于计算数字列所有值的总和。
- ARRAY 函数：用于输入值(包括null)添加到数组中。
- Numeric 函数：完整列出一个 SQL 中所需的操作数的函数。
- String 函数：完整列出一个 SQL 中所需的操作字符的函数。

### 字符串函数和操作符
<table class="reference">
<thead>
<tr>
  <th>函数</th>
  <th>返回类型</th>
  <th>描述</th>
  <th>例子</th>
  <th>结果</th>
</tr>
</thead>
<tbody><tr>
  <td>string 丨丨 string</td>
  <td>text</td>
  <td>字串连接</td>
  <td>'Post' 丨丨 'greSQL'</td>
  <td>PostgreSQL</td>
</tr>
<tr>
  <td>bit_length(string)</td>
  <td>int</td>
  <td>字串里二进制位的个数</td>
  <td>bit_length('jose')</td>
  <td>32</td>
</tr>
<tr>
  <td>char_length(string)</td>
  <td>int</td>
  <td>字串中的字符个数</td>
  <td>char_length('jose')</td>
  <td>4</td>
</tr>
<tr>
  <td>convert(string using conversion_name)</td>
  <td>text</td>
  <td>使用指定的转换名字改变编码。</td>
  <td>convert('PostgreSQL' using iso_8859_1_to_utf8)</td>
  <td>'PostgreSQL'</td>
</tr>
<tr>
  <td>lower(string)</td>
  <td>text</td>
  <td>把字串转化为小写</td>
  <td>lower('TOM')</td>
  <td>tom</td>
</tr>
<tr>
  <td>octet_length(string)</td>
  <td>int</td>
  <td>字串中的字节数</td>
  <td>octet_length('jose')</td>
  <td>4</td>
</tr>
<tr>
  <td>overlay(string placing string from int [for int])</td>
  <td>text</td>
  <td>替换子字串</td>
  <td>overlay('Txxxxas' placing 'hom' from 2 for 4)</td>
  <td>Thomas</td>
</tr>
<tr>
  <td>position(substring in string)</td>
  <td>int</td>
  <td>指定的子字串的位置</td>
  <td>position('om' in 'Thomas')</td>
  <td>3</td>
</tr>
<tr>
  <td>substring(string [from int] [for int])</td>
  <td>text</td>
  <td>抽取子字串</td>
  <td>substring('Thomas' from 2 for 3)</td>
  <td>hom</td>
</tr>
<tr>
  <td>substring(string from pattern)</td>
  <td>text</td>
  <td>抽取匹配 POSIX 正则表达式的子字串</td>
  <td>substring('Thomas' from '…$')</td>
  <td>mas</td>
</tr>
<tr>
  <td>substring(string from pattern for escape)</td>
  <td>text</td>
  <td>抽取匹配SQL正则表达式的子字串</td>
  <td>substring('Thomas' from '%#"o_a#"_' for '#')</td>
  <td>oma</td>
</tr>
<tr>
  <td>trim([leading丨trailing 丨 both] [characters] from string)</td>
  <td>text</td>
  <td>从字串string的开头/结尾/两边/ 删除只包含characters(默认是一个空白)的最长的字串</td>
  <td>trim(both 'x' from 'xTomxx')</td>
  <td>Tom</td>
</tr>
<tr>
  <td>upper(string)</td>
  <td>text</td>
  <td>把字串转化为大写。</td>
  <td>upper('tom')</td>
  <td>TOM</td>
</tr>
<tr>
  <td>ascii(text)</td>
  <td>int</td>
  <td>参数第一个字符的ASCII码</td>
  <td>ascii('x')</td>
  <td>120</td>
</tr>
<tr>
  <td>btrim(string text [, characters text])</td>
  <td>text</td>
  <td>从string开头和结尾删除只包含在characters里(默认是空白)的字符的最长字串</td>
  <td>btrim('xyxtrimyyx','xy')</td>
  <td>trim</td>
</tr>
<tr>
  <td>chr(int)</td>
  <td>text</td>
  <td>给出ASCII码的字符</td>
  <td>chr(65)</td>
  <td>A</td>
</tr>
<tr>
  <td>convert(string text, [src_encoding name,] dest_encoding name)</td>
  <td>text</td>
  <td>把字串转换为dest_encoding</td>
  <td>convert( 'text_in_utf8', 'UTF8', 'LATIN1')</td>
  <td>以ISO 8859-1编码表示的text_in_utf8</td>
</tr>
<tr>
  <td>initcap(text)</td>
  <td>text</td>
  <td>把每个单词的第一个子母转为大写，其它的保留小写。单词是一系列字母数字组成的字符，用非字母数字分隔。</td>
  <td>initcap('hi thomas')</td>
  <td>Hi Thomas</td>
</tr>
<tr>
  <td>length(string text)</td>
  <td>int</td>
  <td>string中字符的数目</td>
  <td>length('jose')</td>
  <td>4</td>
</tr>
<tr>
  <td>lpad(string text, length int [, fill text])</td>
  <td>text</td>
  <td>通过填充字符fill(默认为空白)，把string填充为长度length。 如果string已经比length长则将其截断(在右边)。</td>
  <td>lpad('hi', 5, 'xy')</td>
  <td>xyxhi</td>
</tr>
<tr>
  <td>ltrim(string text [, characters text])</td>
  <td>text</td>
  <td>从字串string的开头删除只包含characters(默认是一个空白)的最长的字串。</td>
  <td>ltrim('zzzytrim','xyz')</td>
  <td>trim</td>
</tr>
<tr>
  <td>md5(string text)</td>
  <td>text</td>
  <td>计算给出string的MD5散列，以十六进制返回结果。</td>
  <td>md5('abc')</td>
  <td></td>
</tr>
<tr>
  <td>repeat(string text, number int)</td>
  <td>text</td>
  <td>重复string number次。</td>
  <td>repeat('Pg', 4)</td>
  <td>PgPgPgPg</td>
</tr>
<tr>
  <td>replace(string text, from text, to text)</td>
  <td>text</td>
  <td>把字串string里出现地所有子字串from替换成子字串to。</td>
  <td>replace('abcdefabcdef', 'cd', 'XX')</td>
  <td>abXXefabXXef</td>
</tr>
<tr>
  <td>rpad(string text, length int [, fill text])</td>
  <td>text</td>
  <td>通过填充字符fill(默认为空白)，把string填充为长度length。如果string已经比length长则将其截断。</td>
  <td>rpad('hi', 5, 'xy')</td>
  <td>hixyx</td>
</tr>
<tr>
  <td>rtrim(string text [, character text])</td>
  <td>text</td>
  <td>从字串string的结尾删除只包含character(默认是个空白)的最长的字</td>
  <td>rtrim('trimxxxx','x')</td>
  <td>trim</td>
</tr>
<tr>
  <td>split_part(string text, delimiter text, field int)</td>
  <td>text</td>
  <td>根据delimiter分隔string返回生成的第field个子字串(1 Base)。</td>
  <td>split_part('abc~@~def~@~ghi', '~@~', 2)</td>
  <td>def</td>
</tr>
<tr>
  <td>strpos(string, substring)</td>
  <td>text</td>
  <td>声明的子字串的位置。</td>
  <td>strpos('high','ig')</td>
  <td>2</td>
</tr>
<tr>
  <td>substr(string, from [, count])</td>
  <td>text</td>
  <td>抽取子字串。</td>
  <td>substr('alphabet', 3, 2)</td>
  <td>ph</td>
</tr>
<tr>
  <td>to_ascii(text [, encoding])</td>
  <td>text</td>
  <td>把text从其它编码转换为ASCII。</td>
  <td>to_ascii('Karel')</td>
  <td>Karel</td>
</tr>
<tr>
  <td>to_hex(number int/bigint)</td>
  <td>text</td>
  <td>把number转换成其对应地十六进制表现形式。</td>
  <td>to_hex(9223372036854775807)</td>
  <td>7fffffffffffffff</td>
</tr>
<tr>
  <td>translate(string text, from text, to text)</td>
  <td>text</td>
  <td>把在string中包含的任何匹配from中的字符的字符转化为对应的在to中的字符。</td>
  <td>translate('12345', '14', 'ax')</td>
  <td>a23x5</td>
</tr>
</tbody></table>

### 类型转换相关函数
<table class="reference">
<thead>
<tr>
  <th>函数</th>
  <th>返回类型</th>
  <th>描述</th>
  <th>实例</th>
</tr>
</thead>
<tbody><tr>
  <td>to_char(timestamp, text)</td>
  <td>text</td>
  <td>将时间戳转换为字符串</td>
  <td>to_char(current_timestamp, 'HH12:MI:SS')</td>
</tr>
<tr>
  <td>to_char(interval, text)</td>
  <td>text</td>
  <td>将时间间隔转换为字符串</td>
  <td>to_char(interval '15h 2m 12s', 'HH24:MI:SS')</td>
</tr>
<tr>
  <td>to_char(int, text)</td>
  <td>text</td>
  <td>整型转换为字符串</td>
  <td>to_char(125, '999')</td>
</tr>
<tr>
  <td>to_char(double precision, text)</td>
  <td>text</td>
  <td>双精度转换为字符串</td>
  <td>to_char(125.8::real, '999D9')</td>
</tr>
<tr>
  <td>to_char(numeric, text)</td>
  <td>text</td>
  <td>数字转换为字符串</td>
  <td>to_char(-125.8, '999D99S')</td>
</tr>
<tr>
  <td>to_date(text, text)</td>
  <td>date</td>
  <td>字符串转换为日期</td>
  <td>to_date('05 Dec 2000', 'DD Mon YYYY')</td>
</tr>
<tr>
  <td>to_number(text, text)</td>
  <td>numeric</td>
  <td>转换字符串为数字</td>
  <td>to_number('12,454.8-', '99G999D9S')</td>
</tr>
<tr>
  <td>to_timestamp(text, text)</td>
  <td>timestamp</td>
  <td>转换为指定的时间格式 time zone  convert string to time stamp</td>
  <td>to_timestamp('05 Dec 2000', 'DD Mon YYYY')</td>
</tr>
<tr>
  <td>to_timestamp(double precision)</td>
  <td>timestamp</td>
  <td>把UNIX纪元转换成时间戳</td>
  <td>to_timestamp(1284352323)</td>
</tr>
</tbody></table>

### 数学函数
> 下面是PostgreSQL中提供的数学函数列表，需要说明的是，这些函数中有许多都存在多种形式，区别只是参数类型不同。除非特别指明，任何特定形式的函数都返回和它的参数相同的数据类型。
<table class="reference">
<thead>
<tr>
  <th>函数</th>
  <th>返回类型</th>
  <th>描述</th>
  <th>例子</th>
  <th>结果</th>
</tr>
</thead>
<tbody><tr>
  <td>abs(x)</td>
  <td></td>
  <td>绝对值</td>
  <td>abs(-17.4)</td>
  <td>17.4</td>
</tr>
<tr>
  <td>cbrt(double)</td>
  <td></td>
  <td>立方根</td>
  <td>cbrt(27.0)</td>
  <td>3</td>
</tr>
<tr>
  <td>ceil(double/numeric)</td>
  <td></td>
  <td>不小于参数的最小的整数</td>
  <td>ceil(-42.8)</td>
  <td>-42</td>
</tr>
<tr>
  <td>degrees(double)</td>
  <td></td>
  <td>把弧度转为角度</td>
  <td>degrees(0.5)</td>
  <td>28.6478897565412</td>
</tr>
<tr>
  <td>exp(double/numeric)</td>
  <td></td>
  <td>自然指数</td>
  <td>exp(1.0)</td>
  <td>2.71828182845905</td>
</tr>
<tr>
  <td>floor(double/numeric)</td>
  <td></td>
  <td>不大于参数的最大整数</td>
  <td>floor(-42.8)</td>
  <td>-43</td>
</tr>
<tr>
  <td>ln(double/numeric)</td>
  <td></td>
  <td>自然对数</td>
  <td>ln(2.0)</td>
  <td>0.693147180559945</td>
</tr>
<tr>
  <td>log(double/numeric)</td>
  <td></td>
  <td>10为底的对数</td>
  <td>log(100.0)</td>
  <td>2</td>
</tr>
<tr>
  <td>log(b numeric,x numeric)</td>
  <td>numeric</td>
  <td>指定底数的对数</td>
  <td>log(2.0, 64.0)</td>
  <td>6.0000000000</td>
</tr>
<tr>
  <td>mod(y, x)</td>
  <td></td>
  <td>取余数</td>
  <td>mod(9,4)</td>
  <td>1</td>
</tr>
<tr>
  <td>pi()</td>
  <td>double</td>
  <td>"π"常量</td>
  <td>pi()</td>
  <td>3.14159265358979</td>
</tr>
<tr>
  <td>power(a double, b double)</td>
  <td>double</td>
  <td>求a的b次幂</td>
  <td>power(9.0, 3.0)</td>
  <td>729</td>
</tr>
<tr>
  <td>power(a numeric, b numeric)</td>
  <td>numeric</td>
  <td>求a的b次幂</td>
  <td>power(9.0, 3.0)</td>
  <td>729</td>
</tr>
<tr>
  <td>radians(double)</td>
  <td>double</td>
  <td>把角度转为弧度</td>
  <td>radians(45.0)</td>
  <td>0.785398163397448</td>
</tr>
<tr>
  <td>random()</td>
  <td>double</td>
  <td>0.0到1.0之间的随机数值</td>
  <td>random()</td>
  <td></td>
</tr>
<tr>
  <td>round(double/numeric)</td>
  <td></td>
  <td>圆整为最接近的整数</td>
  <td>round(42.4)</td>
  <td>42</td>
</tr>
<tr>
  <td>round(v numeric, s int)</td>
  <td>numeric</td>
  <td>圆整为s位小数数字</td>
  <td>round(42.438,2)</td>
  <td>42.44</td>
</tr>
<tr>
  <td>sign(double/numeric)</td>
  <td></td>
  <td>参数的符号(-1,0,+1)</td>
  <td>sign(-8.4)</td>
  <td>-1</td>
</tr>
<tr>
  <td>sqrt(double/numeric)</td>
  <td></td>
  <td>平方根</td>
  <td>sqrt(2.0)</td>
  <td>1.4142135623731</td>
</tr>
<tr>
  <td>trunc(double/numeric)</td>
  <td></td>
  <td>截断(向零靠近)</td>
  <td>trunc(42.8)</td>
  <td>42</td>
</tr>
<tr>
  <td>trunc(v numeric, s int)</td>
  <td>numeric</td>
  <td>截断为s小数位置的数字</td>
  <td>trunc(42.438,2)</td>
  <td>42.43</td>
</tr>
</tbody></table>


### 三角函数列表
<table class="reference">
<thead>
<tr>
  <th>函数</th>
  <th>描述</th>
</tr>
</thead>
<tbody><tr>
  <td>acos(x)</td>
  <td>反余弦</td>
</tr>
<tr>
  <td>asin(x)</td>
  <td>反正弦</td>
</tr>
<tr>
  <td>atan(x)</td>
  <td>反正切</td>
</tr>
<tr>
  <td>atan2(x, y)</td>
  <td>正切 y/x 的反函数</td>
</tr>
<tr>
  <td>cos(x)</td>
  <td>余弦</td>
</tr>
<tr>
  <td>cot(x)</td>
  <td>余切</td>
</tr>
<tr>
  <td>sin(x)</td>
  <td>正弦</td>
</tr>
<tr>
  <td>tan(x)</td>
  <td>正切</td>
</tr>
</tbody></table>
