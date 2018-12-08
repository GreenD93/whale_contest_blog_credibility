# 사다리 v1.0

네이버 웨일 확장앱 콘테스트 본선 진출작으로, 네이버 블로그에 대한 신뢰성 판단을 지원하는 어플리케이션입니다.

__신뢰성의 정의__<br>
신뢰성에 대한 정의는 '해당 분야의 지식을 갖춘 사용자의 솔직한 의견이 담겨있는글'을 신뢰있는 글로 보았고, 반대로 '특정 분야의 경험과 전문적인 지식을 가지고 있지 않은 사용자의 글'을 신뢰성이 떨어지는 글로 정의하였습니다.


18개 분야(맛집, 국내여행, 뷰티 등)의 16,304개 블로그를 이용하여 학습된 딥러닝 모델이 사용되었으며[1], 모델 결과에 대한 설명력을 높이기 위해
K-means 군집화 방법을 추가하였습니다.[2]

주요기능은 다음과 같습니다.

 * '네이버'블로그의 포스트를 읽을 때, 신뢰성 판단 결과를 사용자에게 알람으로 제공합니다.
 * 알람을 누르면 사이드바가 열리며, 결과에 대한 자세한 분석기능(블로그 특징, 감정단어 분석, 시각화)을 제공합니다.
 * 1.일반 유저인지, 2.블로그 체험단을 통하여 작성된 글인지, 3.원고만 받고 쓴 글인지에 대한 정보도 제공합니다. 


## 팀 구성원

*	__조용걸__ [아주대학교 데이터사이언스학과  _yonggeol93@ajou.ac.kr_]
* __전승곤__ [아주대학교 컴퓨터공학과  _vskylife5901@ajou.ac.kr_] 
* __한재호__ [아주대학교 미디어학과  _woghrnt2@ajou.ac.kr_]

*	__Adviser__ 
    *	__한경식__ [아주대학교 컴퓨터공학과/데이터사이언스학과 _kyungsikhan@ajou.ac.kr_]


## 관련 논문

*	[1] How Do Humans Assess the Credibility of Weblogs: Qualifying and Verifying Human Factors with Machine Learning _SIGCHI_ (under review).
*	[2] 기계학습 기반 블로그 신뢰도 시각화 웹 어플리케이션 개발: Visualization Web Application Development Based on Machine learning for Credibility of Weblogs _KHCI_ (under review).
