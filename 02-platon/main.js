(function () {
  'use strict';

  class _mat4 {
    m = 
    [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
    
    constructor(...args) {
      if (args.length == 1 &&  Array.isArray(args[0]) && typeof args[0][0] == "number")
        this.m = 
        [
          [args[0][0], args[0][1], args[0][2], args[0][3]],
          [args[0][4], args[0][5], args[0][6], args[0][7]],
          [args[0][8], args[0][9], args[0][10], args[0][11]],
          [args[0][12], args[0][13], args[0][14], args[0][15]]
        ];
        /*for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[0][i * 4 + j];*/
      else if (args.length == 1 && typeof args[0] == "object" && !Array.isArray(args[0]))
        this.m = 
        [
          [args[0].m[0][0], args[0].m[0][1], args[0].m[0][2], args[0].m[0][3]],
          [args[0].m[1][0], args[0].m[1][1], args[0].m[1][2], args[0].m[1][3]],
          [args[0].m[2][0], args[0].m[2][1], args[0].m[2][2], args[0].m[2][3]],
          [args[0].m[3][0], args[0].m[3][1], args[0].m[3][2], args[0].m[3][3]],
        ];
      else if (args.length == 1 && args[0].length == 4 && Array.isArray(args[0][0])) {
        for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[0][i][j];
      } else if (args.length == 4 && Array.isArray(args[0])) {
        for (let i = 0; i < 4; i++)
          for (let j = 0; j < 4; j++)
            this.m[i][j] = args[i][j];
      } else if (args.length == 16) {
          for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
              this.m[i][j] = args[i * 4 + j];
      } else if (args.length == 1 && typeof args[0] == "number") {
          for (let i = 0; i < 4; i++)
            for (let j = 0; j < 4; j++)
              this.m[i][j] = args[0];
      }
    }

    setIdentity() {
      this.m = 
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    }

    identity() {
      return new _mat4();
    }

    determ() {
      return this.m[0][0] * matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                          this.m[2][1], this.m[2][2], this.m[2][3],
                                          this.m[3][1], this.m[3][2], this.m[3][3]) +
            -this.m[0][1] * matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                          this.m[2][0], this.m[2][2], this.m[2][3],
                                          this.m[3][0], this.m[3][2], this.m[3][3]) +
            +this.m[0][2] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                          this.m[2][0], this.m[2][1], this.m[2][3],
                                          this.m[3][0], this.m[3][1], this.m[3][3]) +
            -this.m[0][3] * matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                          this.m[2][0], this.m[2][1], this.m[2][2],
                                          this.m[3][0], this.m[3][1], this.m[3][2]);
    }

    setTranslate(v) {
      this.m = 
      [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [v.x, v.y, v.z, 1]
      ];
    }

    translate(v) {
      return mat4([1, 0, 0, 0],
                  [0, 1, 0, 0],
                  [0, 0, 1, 0],
                  [v.x, v.y, v.z, 1]);
    }

    mulMatr(a)
    {
      let r = mat4();

      r.m[0][0] = this.m[0][0] * a.m[0][0] + this.m[0][1] * a.m[1][0] + this.m[0][2] * a.m[2][0] +
        this.m[0][3] * a.m[3][0];

      r.m[0][1] = this.m[0][0] * a.m[0][1] + this.m[0][1] * a.m[1][1] + this.m[0][2] * a.m[2][1] +
        this.m[0][3] * a.m[3][1];

      r.m[0][2] = this.m[0][0] * a.m[0][2] + this.m[0][1] * a.m[1][2] + this.m[0][2] * a.m[2][2] +
        this.m[0][3] * a.m[3][2];

      r.m[0][3] = this.m[0][0] * a.m[0][3] + this.m[0][1] * a.m[1][3] + this.m[0][2] * a.m[2][3] +
        this.m[0][3] * a.m[3][3];


      r.m[1][0] = this.m[1][0] * a.m[0][0] + this.m[1][1] * a.m[1][0] + this.m[1][2] * a.m[2][0] +
        this.m[1][3] * a.m[3][0];

      r.m[1][1] = this.m[1][0] * a.m[0][1] + this.m[1][1] * a.m[1][1] + this.m[1][2] * a.m[2][1] +
        this.m[1][3] * a.m[3][1];

      r.m[1][2] = this.m[1][0] * a.m[0][2] + this.m[1][1] * a.m[1][2] + this.m[1][2] * a.m[2][2] +
        this.m[1][3] * a.m[3][2];

      r.m[1][3] = this.m[1][0] * a.m[0][3] + this.m[1][1] * a.m[1][3] + this.m[1][2] * a.m[2][3] +
        this.m[1][3] * a.m[3][3];


      r.m[2][0] = this.m[2][0] * a.m[0][0] + this.m[2][1] * a.m[1][0] + this.m[2][2] * a.m[2][0] +
        this.m[2][3] * a.m[3][0];

      r.m[2][1] = this.m[2][0] * a.m[0][1] + this.m[2][1] * a.m[1][1] + this.m[2][2] * a.m[2][1] +
        this.m[2][3] * a.m[3][1];

      r.m[2][2] = this.m[2][0] * a.m[0][2] + this.m[2][1] * a.m[1][2] + this.m[2][2] * a.m[2][2] +
        this.m[2][3] * a.m[3][2];

      r.m[2][3] = this.m[2][0] * a.m[0][3] + this.m[2][1] * a.m[1][3] + this.m[2][2] * a.m[2][3] +
        this.m[2][3] * a.m[3][3];


      r.m[3][0] = this.m[3][0] * a.m[0][0] + this.m[3][1] * a.m[1][0] + this.m[3][2] * a.m[2][0] +
        this.m[3][3] * a.m[3][0];

      r.m[3][1] = this.m[3][0] * a.m[0][1] + this.m[3][1] * a.m[1][1] + this.m[3][2] * a.m[2][1] +
        this.m[3][3] * a.m[3][1];

      r.m[3][2] = this.m[3][0] * a.m[0][2] + this.m[3][1] * a.m[1][2] + this.m[3][2] * a.m[2][2] +
        this.m[3][3] * a.m[3][2];

      r.m[3][3] = this.m[3][0] * a.m[0][3] + this.m[3][1] * a.m[1][3] + this.m[3][2] * a.m[2][3] +
        this.m[3][3] * a.m[3][3];

      return r;
    }

    inverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0)
        return;

      /* build adjoint matrix */
      r.m[0][0] =
        +matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][0] =
        +matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;

      r.m[0][1] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][1] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][2] =
        +matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][2] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][3] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3]) / det;

      r.m[1][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3]) / det;

      r.m[2][3] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3]) / det;

      r.m[3][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2]) / det;

      return r;
    }

    setInverse() {
      let r = mat4();
      let det = this.determ();

      if (det == 0)
        this.setIdentity();

      /* build adjoint matrix */
      r.m[0][0] =
        +matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][0] =
        +matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][0] =
        -matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;

      r.m[0][1] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[2][1], this.m[2][2], this.m[2][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[2][0], this.m[2][2], this.m[2][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][1] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[2][0], this.m[2][1], this.m[2][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][1] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[2][0], this.m[2][1], this.m[2][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][2] =
        +matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[3][1], this.m[3][2], this.m[3][3]) / det;

      r.m[1][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[3][0], this.m[3][2], this.m[3][3]) / det;

      r.m[2][2] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[3][0], this.m[3][1], this.m[3][3]) / det;

      r.m[3][2] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[3][0], this.m[3][1], this.m[3][2]) / det;


      r.m[0][3] =
        -matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                       this.m[1][1], this.m[1][2], this.m[1][3],
                       this.m[2][1], this.m[2][2], this.m[2][3]) / det;

      r.m[1][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                       this.m[1][0], this.m[1][2], this.m[1][3],
                       this.m[2][0], this.m[2][2], this.m[2][3]) / det;

      r.m[2][3] =
        -matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                       this.m[1][0], this.m[1][1], this.m[1][3],
                       this.m[2][0], this.m[2][1], this.m[2][3]) / det;

      r.m[3][3] =
        +matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                       this.m[1][0], this.m[1][1], this.m[1][2],
                       this.m[2][0], this.m[2][1], this.m[2][2]) / det;

      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 4 ; j++)
          this.m[i][j] = r.m[i][j];
    }

    rotate(angle, v) {
      let a = angle * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);

      return mat4(
          c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0,
          v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0,
          v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0,
          0, 0, 0, 1);
    }

    setRotate(angle, v) {
      let a = angle * Math.PI / 180, s = Math.sin(a), c = Math.cos(a);

      this.m =
      [
        [c + v.x * v.x * (1 - c), v.y * v.x * (1 - c) - v.z * s, v.z * v.x * (1 - c) + v.y * s, 0],
        [v.x * v.y * (1 - c) + v.z * s, c + v.y * v.y * (1 - c), v.z * v.y * (1 - c) - v.x * s, 0],
        [v.x * v.z * (1 - c) - v.y * s, v.y * v.z * (1 - c) + v.x * s, c + v.z * v.z * (1 - c), 0],
        [0, 0, 0, 1]
      ];
    }

    view(Loc, At, Up1) {
      let
        Dir = At.subVec(Loc).normalize(),
        Right = Dir.cross(Up1).normalize(),
        Up = Right.cross(Dir).normalize();
      
      return mat4(Right.x, Up.x, -Dir.x, 0,
                   Right.y, Up.y, -Dir.y, 0,
                   Right.z, Up.z, -Dir.z, 0,
                   -Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1);
    }

    setView(Loc, At, Up1) {
      let
        Dir = At.subVec(Loc).normalize(),
        Right = Dir.cross(Up1).normalize(),
        Up = Right.cross(Dir).normalize();
      
      this.m =
      [
        [Right.x, Up.x, -Dir.x, 0],
        [Right.y, Up.y, -Dir.y, 0],
        [Right.z, Up.z, -Dir.z, 0],
        [-Loc.dot(Right), -Loc.dot(Up), Loc.dot(Dir), 1]
      ];
    }

    frustum(left, right, bottom, top, near, far) {
      return mat4((2 * near) / (right - left), 0, 0, 0,
                   0, (2 * near) / (top - bottom), 0, 0,
                   (right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1),
                   0, 0, (-((2 * near * far) / (far - near))), 0);
    }

    setFrustum(left, right, bottom, top, near, far) {
      this.m =
      [
        [(2 * near) / (right - left), 0, 0, 0],
        [0, (2 * near) / (top - bottom), 0, 0],
        [(right + left) / (right - left), (top + bottom) / (top - bottom), (-((far + near) / (far - near))), (-1)],
        [0, 0, (-((2 * near * far) / (far - near))), 0]
      ];
    }

    transpose() {
      return mat4(this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0],
        this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1],
        this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2],
        this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]);
    }

    setTranspose() {
      this.m = 
      [
        [this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]],
        [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]],
        [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]],
        [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]
      ];
    }

    rotateX(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(1, 0, 0, 0,
                  0, co, si, 0,
                  0, -si, co, 0,
                  0, 0, 0, 1);
    }

    setRotateX(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [1, 0, 0, 0],
        [0, co, si, 0],
        [0, -si, co, 0],
        [0, 0, 0, 1]
      ];  
    }

    rotateY(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(co, 0, -si, 0,
                  0, 1, 0, 0,
                  si, 0, co, 0,
                  0, 0, 0, 1);
    }

    setRotateY(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [co, 0, -si, 0],
        [0, 1, 0, 0],
        [si, 0, co, 0],
        [0, 0, 0, 1]
      ];
    }

    rotateZ(angleInDegree) {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      return mat4(co, si, 0, 0,
                  -si, co, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1);
    }

    setRotateZ(angleInDegree)
    {
      let a = angleInDegree * Math.PI / 180, si = Math.sin(a), co = Math.cos(a);

      this.m = 
      [
        [co, si, 0, 0],
        [-si, co, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
      ];
    }

    scale(v) {
      return mat4(v.x, 0, 0, 0,
                  0, v.y, 0, 0,
                  0, 0, v.z, 0,
                  0, 0, 0, 1);
    }

    setScale(v) {
      this.m =
      [
        [v.x, 0, 0, 0],
        [0, v.y, 0, 0],
        [0, 0, v.z, 0],
        [0, 0, 0, 1]
      ];
    }

    ortho(left, right, bottom, top, near, far)
    {
      return mat4(2 / (right - left), 0, 0, 0,
                  0, 2 / (top - bottom), 0, 0,
                  0, 0, -2 / (far - near), 0,
                  -(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1);
    }

    setOrtho(left, right, bottom, top, near, far)
    {
      this.m =
      [
        [2 / (right - left), 0, 0, 0],
        [0, 2 / (top - bottom), 0, 0],
        [0, 0, -2 / (far - near), 0],
        [-(right + left) / (right - left), -(top + bottom) / (top - bottom), -(far + near) / (far - near), 1]
      ];
    }

    toArray() {
      return [].concat(...this.m);
    }
  }

  function mat4(...args) {
    return new _mat4(...args);
  }

  function matrDeterm3x3(a11, a12, a13,
                         a21, a22, a23,
                         a31, a32, a33) {
    return a11 * a22 * a33 + a12 * a23 * a31 + a13 * a21 * a32 -
           a11 * a23 * a32 - a12 * a21 * a33 - a13 * a22 * a31;
  }

  class _vec3 {
    x;
    y;
    z;

    constructor(...args) { 
      if (args.length === 3)
        this.x = args[0], this.y = args[1], this.z = args[2];
      else if (typeof args[0] == "object") {
        this.x = args[0].x, this.y = args[0].y, this.z = args[0].z; 
      } else {
        this.x = args[0], this.y = args[0], this.z = args[0]; 
      }
    } // End of 'constructor' function

    // Vector multiplue by number function
    mulNum(num) {
      return vec3(this.x * num, this.y * num, this.z * num);
    } // End of 'mulNum' function

    // Vector divide by number function
    divNum(num) {
      return vec3(this.x / num, this.y / num, this.z / num);
    } // End of 'duvNum' function

    // Vector add number function
    addNum(num) {
      return vec3(this.x + num, this.y + num, this.z + num);
    } // End of 'addNum' function

    // Vector substract number function
    subNum(num) {
      return vec3(this.x - num, this.y - num, this.z - num);
    } // End of 'subNum' function

    // Vector add vector function
    addVec(vec) {
      return vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);
    } // End of 'addVec' function

    // Vector substract vector function
    subVec(vec) {
      return vec3(this.x - vec.x, this.y - vec.y, this.z - vec.z);
    } // End of 'subVec' function

    // Make vector negative vector
    neg(vec) {
      return vec3(-this.x, -this.y, -this.z);
    } // End of 'neg' function

    // Vector dot product function
    dot(vec) {
      return this.x * vec.x + this.y * vec.y + this.z * vec.z;
    } // End of 'dot' function

    // Vector cross product function
    cross(vec) {
      return vec3(
        this.y * vec.z - this.z * vec.y,
        this.z * vec.x - this.x * vec.z,
        this.x * vec.y - this.y * vec.x);
    } // End of 'cross' function
    
    // Vector lenght evaulating function
    len() {
      let len = this.dot(this);

      if (len == 0 || len == 1)
        return len;

      return Math.sqrt(len);
    } // End of 'len' function

    // Square of vector lenght evaulating function
    len2() {
      return this.dot(this);
    } // End of 'len2' function

    // Vector normalizing function
    normalize() {
      return this.divNum(this.len());
    } // End of 'normalize' function

    // Vector setting normalize function
    setNormalize() {
      let l = this.len();

      this.x /= l;
      this.y /= l;
      this.z /= l;
    } // End of 'normalize' function

    // Vector transform by matrix function
    vectorTransform(a)
    {
      return vec3(this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0],
                  this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1],
                  this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2]);
    } // End of 'vectorTransform' function

    // Vector multiplue by matrix function
    mulMatr(m)
    {
      let w = this.x * a.m[0][3] + this.y * a.m[1][3] + this.z * a.m[2][3] + a.m[3][3];
    
      return vec3((this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0] + a.m[3][0]) / w,
                    (this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1] + a.m[3][1]) / w,
                    (this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2] + a.m[3][2]) / w);
    } // End of 'mulMatr' function

    pointTransform(m)
    {
      return vec3(this.x * a.m[0][0] + this.y * a.m[1][0] + this.z * a.m[2][0] + a.m[3][0],
                this.x * a.m[0][1] + this.y * a.m[1][1] + this.z * a.m[2][1] + a.m[3][1],
                this.x * a.m[0][2] + this.y * a.m[1][2] + this.z * a.m[2][2] + a.m[3][2]);
    } // End of 'pointTransform' function
  }

  // Vector setting function
  function vec3(...args) {
    return new _vec3(...args);
  } // End of 'vec3' function

  class _camera {
    loc;   /* Camera location */
    at;    /* Camera look-at point */
    dir;   /* Camera direction */
    right; /* Camera right direction */
    up;    /* Camera up direction */

    matrView; /* View matrix */
    matrProj; /* Projection matrix */
    matrVP;   /* Stored (View * Proj) matrix */

    frameW; /* Frame width (in pixels) */
    frameH; /* Frame height (in pixels) */

    wp;          /* Project plane size (width) */
    hp;          /* Project plane size (height) */
    projSize;    /* Project plane fit square */
    projDist;    /* Distance to project plane from viewer (near) */
    projFarClip; /* Distance to project for clip plane (far) */

    constructor() {
      this.matrProj = mat4();
      this.matrView = mat4();
      this.matrVP = mat4();

      this.frameH = 1000;
      this.frameW = 1000;

      this.projDist = 0.10;
      this.projFarClip = 300;
      this.projSize = 0.1;
    }
    set(loc, at, up)
    {
      this.matrView.setView(loc, at, up);

      this.right = vec3(this.matrView.m[0][0],
                        this.matrView.m[1][0],
                        this.matrView.m[2][0]);
      this.up = vec3(this.matrView.m[0][1],
                     this.matrView.m[1][1],
                     this.matrView.m[2][1]);
      this.dir = vec3(-this.matrView.m[0][2],
                      -this.matrView.m[1][2],
                      -this.matrView.m[2][2]);
      this.loc = vec3(loc);
      this.at = vec3(at);

      this.matrVP = this.matrView.mulMatr(this.matrProj);
    } // End of 'set' function

    setProj(projSize, projDist, projFarClip)
    {
      let rx, ry;

      this.projDist = projDist;
      this.projFarClip = projFarClip;
      rx = ry = this.projSize = projSize;

      /* Correct aspect ratio */
      if (this.frameW >= this.frameH)
        rx *= this.frameW / this.frameH;
      else
        ry *= this.frameH / this.frameW;

      this.wp = rx;
      this.hp = ry;
      this.matrProj.setFrustum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.projFarClip);
      this.matrVP = this.matrView.mulMatr(this.matrProj);
    } // End of 'setProj' function

    setSize(frameW, frameH)
    {
      this.frameW = frameW;
      this.frameH = frameH;
      this.setProj(this.projSize, this.projDist, this.projFarClip);
    } // End of 'setSize' function
  }

  function camera(){
    return new _camera();
  }

  class _renderObject {
    gl;
    canvas;
    mainCam;
    startTime;
    time;

    primList = [];
    
    constructor (canvasId) {
      this.init(canvasId);
    }

    init (canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.gl = this.canvas.getContext("webgl2");
      this.mainCam = camera();

      this.gl.enable(this.gl.DEPTH_TEST);
      const date = new Date();
      this.time = this.startTime = date.getMinutes() * 60 +
              date.getSeconds() +
              date.getMilliseconds() / 1000;

      this.gl.clearColor(0.30, 0.47, 0.8, 1);

    }

    drawFrame() {
      const date = new Date();
      this.time = date.getMinutes() * 60 +
              date.getSeconds() +
              date.getMilliseconds() / 1000 - this.startTime;

      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }

    drawPrim(p) {
      p.primMtlPtn.shd.apply();

      //let mW = mat4().rotateY(47 * this.time);
      let mW = mat4().rotate(47 * this.time, vec3(1, 1, 1).normalize());
      let mWVP = mW.mulMatr(this.mainCam.matrVP);
      let mWInv = mW.inverse().transpose();

      if (p.primMtlPtn.shd.uniforms["MatrWVP"] != undefined)
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrWVP"].loc, false, new Float32Array(mWVP.toArray()));
      if (p.primMtlPtn.shd.uniforms["MatrW"] != undefined) 
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrW"].loc, false, new Float32Array(mW.toArray()));
      if (p.primMtlPtn.shd.uniforms["MatrWInv"] != undefined)
        this.gl.uniformMatrix4fv(p.primMtlPtn.shd.uniforms["MatrWInv"].loc, false, new Float32Array(mWInv.toArray()));
      if (p.primMtlPtn.shd.uniforms["Time"] != undefined)
        this.gl.uniform1f(p.primMtlPtn.shd.uniforms["Time"].loc, this.time);

      this.gl.bindVertexArray(p.vertexArray);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, p.vertexBuffer);
      if (p.indexBuffer != undefined) {
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, p.indexBuffer);

        this.gl.drawElements(p.type, p.noofI, this.gl.UNSIGNED_INT, 0);
      } else {
        this.gl.drawArrays(p.type, 0, p.noofV);
      }
    }
  }

  function renderObject(canvasId) {
    return new _renderObject(canvasId);
  }

  // -------------------------------------------------
  class _shader {
    glDrawingContext;
    name;

    async create() {
      this.id = null;
      this.shaders =
      [
         {
           id: null,
           type: this.glDrawingContext.VERTEX_SHADER,
           name: "vert",
           src: "",
         },
         {
          id: null,
          type: this.glDrawingContext.FRAGMENT_SHADER,
          name: "frag",
          src: "",
         }
      ];
      for (const s of this.shaders) {
        let response = await fetch(`bin/shaders/${this.name}/${s.name}.glsl`);
        let src = await response.text();
        if (typeof src == "string" && src != "")
          s.src = src;
      }
      // recompile shaders
      this.updateShadersSource();
   }  

    updateShadersSource() { 
      this.shaders[0].id = null;
      this.shaders[1].id = null;
      this.id = null;
      if (this.shaders[0].src == "" || this.shaders[1].src == "")
        return;
      this.shaders.forEach(s => {
        s.id = this.glDrawingContext.createShader(s.type);
        this.glDrawingContext.shaderSource(s.id, s.src);
        this.glDrawingContext.compileShader(s.id);
        if (!this.glDrawingContext.getShaderParameter(s.id, this.glDrawingContext.COMPILE_STATUS)) {
          let buf = this.glDrawingContext.getShaderInfoLog(s.id);
          console.log(`Shader ${this.name}/${s.name} compile fail: ${buf}`);
        }                                            
      });             
   
      this.id = this.glDrawingContext.createProgram();
      this.shaders.forEach(s => {
        if (s.id != null)
          this.glDrawingContext.attachShader(this.id, s.id);
      });
      this.glDrawingContext.linkProgram(this.id);
      if (!this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.LINK_STATUS)) {
        let buf = this.glDrawingContext.getProgramInfoLog(this.id);
        console.log(`Shader program ${this.name} link fail: ${buf}`);
      }                                            
      this.updateShaderData();    
    }

    updateShaderData() {
      // Shader attributes
      this.attrs = {};
      const countAttrs = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_ATTRIBUTES);
      for (let i = 0; i < countAttrs; i++) {
        const info = this.glDrawingContext.getActiveAttrib(this.id, i);
        this.attrs[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.glDrawingContext.getAttribLocation(this.id, info.name),
        };
      }
      
      // Shader uniforms
      this.uniforms = {};
      const countUniforms = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_UNIFORMS);
      for (let i = 0; i < countUniforms; i++) {
        const info = this.glDrawingContext.getActiveUniform(this.id, i);
        this.uniforms[info.name] = {
          name: info.name,
          type: info.type,
          size: info.size,
          loc: this.glDrawingContext.getUniformLocation(this.id, info.name),
        };
      }

      // Shader uniform blocks
      this.uniformBlocks = {};
      const countUniformBlocks = this.glDrawingContext.getProgramParameter(this.id, this.glDrawingContext.ACTIVE_UNIFORM_BLOCKS);
      for (let i = 0; i < countUniformBlocks; i++) {
        const block_name = this.glDrawingContext.getActiveUniformBlockName(this.id, i);
        const index = this.glDrawingContext.getActiveUniformBlockIndex(this.id, block_name);
        this.uniformBlocks[block_name] = {
          name: block_name,
          index: index,
          size: this.glDrawingContext.getActiveUniformBlockParameter(this.id, idx, this.glDrawingContext.UNIFORM_BLOCK_DATA_SIZE),
          bind: this.glDrawingContext.getActiveUniformBlockParameter(this.id, idx, this.glDrawingContext.UNIFORM_BLOCK_BINDING),
        };
      }
      
    }
   
    constructor(name, rndObj) {
      this.glDrawingContext = rndObj.gl;
      this.name = name;
    }
   
    apply() {
      if (this.id != null)
        this.glDrawingContext.useProgram(this.id);
    }
  }

  function shader(name, rndObj) {
    return new _shader(name, rndObj);
  }

  class _materialPattern {
    shd;
    name;

    constructor(name, shdName, rndObj) {
      this.name = name;
      this.shd = shader(shdName, rndObj);
    }
  }

  function materialPattern(name, shdName, rndObj) {
    return new _materialPattern(name, shdName, rndObj);
  }

  class _prim {
    vertexBuffer;
    indexBuffer;
    primMtlPtn;
    vertexArray;
    noofV = 0;
    noovI = 0;
    type;

    constructor(mtlPtn, type, vertexes, indexes) {
      let gl = mtlPtn.shd.glDrawingContext;

      if (type == "triangles")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLES;
      else if (type == "triangle strip")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLE_STRIP;
      else if (type == "line strip")
        this.type = mtlPtn.shd.glDrawingContext.LINE_STRIP;
      else if (type == "triangle fun")
        this.type = mtlPtn.shd.glDrawingContext.TRIANGLE_FUN;
      else
        this.type = mtlPtn.shd.glDrawingContext.POINTS;

      let vertFormat = [
        {name : "Position",
         size : 12},
        {name : "Normal",
         size : 12}
        ];
      let vertSize = 0;
      
      vertFormat.forEach((elem) => {
        vertSize += elem.size;
      });

      this.noofV = vertexes.length / (vertSize / 4);

      ///console.log(mtlPtn.shd);

      // vertex buffer
      this.primMtlPtn = mtlPtn;
      this.vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexes), gl.STATIC_DRAW);

      // index buffer
      if (indexes != undefined) {
        this.noofI = indexes.length;
        this.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indexes), gl.STATIC_DRAW);
      }

      // vertex attribs
      this.vertexArray= gl.createVertexArray();
      gl.bindVertexArray(this.vertexArray);

      let allSize = 0;
      for (let i in vertFormat) {
        let findedAttr = mtlPtn.shd.attrs["In" + vertFormat[i].name];

        if (findedAttr != undefined) {
          let attrLoc = mtlPtn.shd.attrs["In" + vertFormat[i].name].loc;

          if (attrLoc != -1) {
            gl.vertexAttribPointer(attrLoc, vertFormat[i].size / 4, gl.FLOAT, false, vertSize, allSize);
            gl.enableVertexAttribArray(attrLoc);
          }

          allSize += vertFormat[i].size;
        }
      }
    }
  }

  function prim(mtlPtn, type, vertexes, indexes) {
    return new _prim(mtlPtn, type, vertexes, indexes);
  }

  class _vertex {
    pos;
    norm;

    constructor(pos, norm) {
      this.pos = pos;

      if (norm == undefined)
        this.norm = vec3(0);
      else  
        this.norm = norm;
    }

    toArray() {
      return [this.pos.x, this.pos.y, this.pos.z, this.norm.x, this.norm.y, this.norm.z];
    }

    createVertexArray(...args) {
      let vs;

      if (args.length == 1 && Array.isArray(args[0]))
        vs = args[0];
      else
        vs = args;

      let v = [];

      vs.forEach(element => {
        v.push(...element.toArray());
      });

      return v;
    }

    autoNormal(vertexes, indexes) {
      for (let i = 0; i < vertexes.length; i++){
        vertexes[i].norm = vec3(0);
      }

      if (indexes == undefined) {
        for (let i = 0; i < vertexes.length; ){
          let v1 = vertexes[i + 1].pos.subVec(vertexes[i].pos);
          let v2 = vertexes[i + 2].pos.subVec(vertexes[i].pos);

          let n = v1.cross(v2);
          
          vertexes[i].norm = vertexes[i].norm.addVec(n);
          vertexes[i + 1].norm = vertexes[i + 1].norm.addVec(n);
          vertexes[i + 2].norm = vertexes[i + 2].norm.addVec(n);

          i += 3;
        }
      } else {
        for (let j = 0; j < indexes.length; ) {
          if (indexes[j] == -1 || indexes[j + 1] == -1 || indexes[j + 2] == -1) {
            j++;
            continue;
          }

          let v1 = vertexes[indexes[j + 1]].pos.subVec(vertexes[indexes[j]].pos);
          let v2 = vertexes[indexes[j + 2]].pos.subVec(vertexes[indexes[j]].pos);

          let n = v1.cross(v2);
          
          vertexes[indexes[j]].norm = vertexes[indexes[j]].norm.addVec(n);
          vertexes[indexes[j + 1]].norm = vertexes[indexes[j + 1]].norm.addVec(n);
          vertexes[indexes[j + 2]].norm = vertexes[indexes[j + 2]].norm.addVec(n);

          j += 3;
        }
      }

      for (let i = 0; i < vertexes.length; i++){
        vertexes[i].norm = vertexes[i].norm.normalize();
      
      }  
      return vertexes;
    
    }

  }

  function vertex(pos, norm) {
    return new _vertex(pos, norm);
  }

  class Platon {
    static cubeCreate(mtlPtn, size) {
      let pnts = [
        vec3(-1, -1, -1), vec3(1, -1, -1),
        vec3(1, -1, 1), vec3(-1, -1, 1),
        vec3(-1, 1, -1), vec3(1, 1, -1),
        vec3(1, 1, 1), vec3(-1, 1, 1),
      ];
      
      let ind = [
        1, 0, 2, 3, -1,
        5, 6, 1, 2, -1,
        6, 7, 2, 3, -1,
        7, 4, 3, 0, -1,
        4, 5, 0, 1, -1,
        4, 5, 7, 6, -1,
      ];
    
      let norms = [
        vec3(0, -1, 0), vec3(1, 0, 0),
        vec3(0, 0, 1), vec3(-1, 0, 0),
        vec3(0, 0, -1), vec3(0, 1, 0),
      ];
    
      let vert = [];
    
      let uInd = [];
    
      let j = 0;
      for (let i = 0; i < ind.length; i++) {
        if (ind[i] != -1) {
          vert.push(vertex(pnts[ind[i]].mulNum(size), norms[Math.floor(i / 5)]));
          uInd.push(j);
          j++;
        }
        else
          uInd.push(-1);
      }
    
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangle strip", vertexArr, uInd);
    }
    
    static octCreate(mtlPtn, size) {
      let pnts = [
        vec3(0, 1, 0), vec3(0, 0, 1),
        vec3(-1, 0, 0), vec3(0, 0, -1),
        vec3(1, 0, 0), vec3(0, -1, 0),
      ];
      
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 1,
        5, 1, 2,
        5, 2, 3,
        5, 3, 4,
        5, 4, 1,
      ];
    
      let vert = [];
    
      for (let i = 0; i < ind.length; i++) {
        vert.push(vertex(pnts[ind[i]].mulNum(size)));
      }
    
      vert = vertex().autoNormal(vert);
    
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    
    }
    
    static tetrCreate(mtlPtn, size) {
      const sqrt3 = Math.sqrt(3);
      const sqrt23 = Math.sqrt(2 / 3);
    
      let vt = [
        vertex(vec3(0, 0, sqrt3 / 3)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(-0.5, 0, -sqrt3 / 6)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(-0.5, 0, -sqrt3 / 6)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(0.5, 0, -sqrt3 / 6)), vertex(vec3(0, 0, sqrt3 / 3)),
        vertex(vec3(0, sqrt23, 0)), vertex(vec3(-0.5, 0, -sqrt3 / 6)), vertex(vec3(0, 0, sqrt3 / 3)),
      ];
    
      vt.forEach((vert) => {
        vert.pos = vert.pos.mulNum(size);
      });
    
      vt = vertex().autoNormal(vt);
    
      vt = vertex().createVertexArray(vt);
    
      return prim(mtlPtn, "triangles", vt);
    }
    
    static icoCreate(mtlPtn, size) {
      const sqrt5d2 = Math.sqrt(5) / 2;
    
      let pnts = [
        vec3(0, sqrt5d2, 0)
      ];
    
      for (let i = 0; i < 5; i++) {
        pnts.push(vec3(Math.cos((72 * i) * Math.PI /180), 0.5, Math.sin((72 * i) * Math.PI /180)));
      }
    
      for (let i = 0; i < 5; i++) {
        pnts.push(vec3(-Math.cos((72 * i) * Math.PI /180), -0.5, -Math.sin((72 * i) * Math.PI /180)));
      }
    
      pnts.push(vec3(0, -sqrt5d2, 0));
    
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 1,
        1, 9, 8, 
        1, 2, 9,
        2, 10, 9,
        2, 3, 10,
        3, 6, 10,
        3, 4, 6,
        4, 7, 6,
        4, 5, 7,
        5, 8, 7,
        5, 1, 8,
        11, 6, 7,
        11, 7, 8,
        11, 8, 9,
        11, 9, 10,
        11, 10, 6,
      ];
    
      let vert = [];
    
      for (let i in ind) {
        vert.push(vertex(pnts[ind[i]].mulNum(size)));
      }
    
      vertex().autoNormal(vert);
      
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    }
    
    static dodecCreate(mtlPtn, size) {
      const sqrt5d2 = Math.sqrt(5) / 2;
    
      let pnts0 = [
        vec3(0, sqrt5d2, 0)
      ];
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(Math.cos((72 * i) * Math.PI /180), 0.5, Math.sin((72 * i) * Math.PI /180)));
      }
    
      for (let i = 0; i < 5; i++) {
        pnts0.push(vec3(-Math.cos((72 * i) * Math.PI /180), -0.5, -Math.sin((72 * i) * Math.PI /180)));
      }
    
      pnts0.push(vec3(0, -sqrt5d2, 0));
    
      let ind = [
        0, 1, 2,
        0, 2, 3,
        0, 3, 4,
        0, 4, 5,
        0, 5, 1,
        1, 9, 8, 
        1, 2, 9,
        2, 10, 9,
        2, 3, 10,
        3, 6, 10,
        3, 4, 6,
        4, 7, 6,
        4, 5, 7,
        5, 8, 7,
        5, 1, 8,
        11, 6, 7,
        11, 7, 8,
        11, 8, 9,
        11, 9, 10,
        11, 10, 6,
      ];
    
      let pnts1 = [];
    
      for (let i = 0; i < ind.length; i += 3) {
        pnts1.push(pnts0[ind[i]].addVec(pnts0[ind[i + 1]]).addVec(pnts0[ind[i + 2]]).divNum(3));
      }
    
      let indexes = [
        0, 1, 2, 0, 2, 3, 0, 3, 4,
        0, 1, 8, 0, 8, 7, 0, 7, 6,
        1, 2, 10, 1, 10, 9, 1, 9, 8,
        2, 3, 12, 2, 12, 11, 2, 11, 10,
        3, 4, 14, 3, 14, 13, 3, 13, 12,
        4, 0, 6, 4, 6, 5, 4, 5, 14,
        7, 8, 9, 7, 9, 19, 7, 19, 18,
        9, 10, 11, 9, 11, 15, 9, 15, 19,
        11, 12, 13, 11, 13, 16, 11, 16, 15,
        13, 14, 5, 13, 5, 17, 13, 17, 16,
        5, 6, 7, 5, 7, 18, 5, 18, 17,
        15, 16, 17, 15, 17, 18, 15, 18, 19,
      ];
    
      let vert = [];
    
      for (let i in indexes) {
        vert.push(vertex(pnts1[indexes[i]].mulNum(size)));
      }
    
      vertex().autoNormal(vert);
      
      let vertexArr = vertex().createVertexArray(vert);
    
      return prim(mtlPtn, "triangles", vertexArr);
    }
  }

  function main() {
    let 
      tetrRnd,
      cubeRnd,
      octRnd,
      dodecRnd,
      icoRnd;
    
    let 
      tetrMtlPtn,
      cubeMtlPtn,
      octMtlPtn,
      dodecMtlPtn,
      icoMtlPtn;
    
    let 
      tetrPrim,
      cubePrim,
      octPrim,
      dodecPrim,
      icoPrim;

    tetrRnd = renderObject("can0");
    cubeRnd = renderObject("can1");
    octRnd = renderObject("can2");
    dodecRnd = renderObject("can3");
    icoRnd = renderObject("can4");
   
    
    tetrRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    tetrRnd.mainCam.setSize(1000, 1000);
    cubeRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    cubeRnd.mainCam.setSize(1000, 1000);
    octRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    octRnd.mainCam.setSize(1000, 1000);
    dodecRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    dodecRnd.mainCam.setSize(1000, 1000);
    icoRnd.mainCam.set(vec3(0, 0, 3), vec3(0, 0, 0), vec3(0, 1, 0));
    icoRnd.mainCam.setSize(1000, 1000);

    tetrMtlPtn = materialPattern("tetr", "default", tetrRnd);
    cubeMtlPtn = materialPattern("cube", "default", cubeRnd);
    octMtlPtn = materialPattern("oct", "default", octRnd);
    dodecMtlPtn = materialPattern("dodec", "default", dodecRnd);
    icoMtlPtn = materialPattern("ico", "default", icoRnd);

    const draw = () => {
      // drawing
      tetrRnd.drawFrame();
      cubeRnd.drawFrame();
      octRnd.drawFrame();
      dodecRnd.drawFrame();
      icoRnd.drawFrame();

      tetrRnd.drawPrim(tetrPrim);
      cubeRnd.drawPrim(cubePrim);
      octRnd.drawPrim(octPrim);
      dodecRnd.drawPrim(dodecPrim);
      icoRnd.drawPrim(icoPrim);
      // animation register
      window.requestAnimationFrame(draw);
      };

    tetrMtlPtn.shd.create().then(() => {
      tetrPrim = Platon.tetrCreate(tetrMtlPtn, 1);
      cubeMtlPtn.shd.create().then(() => {
        cubePrim = Platon.cubeCreate(cubeMtlPtn, 0.5);
        octMtlPtn.shd.create().then(() => {
          octPrim = Platon.octCreate(octMtlPtn, 1);
          dodecMtlPtn.shd.create().then(() => {
            dodecPrim = Platon.dodecCreate(dodecMtlPtn, 1);
            icoMtlPtn.shd.create().then(() => {
              icoPrim = Platon.icoCreate(icoMtlPtn, 1);

              draw();
            });
          });
        });
      });
    }
    );

    fstMtlPtn.shd.create().then(() => {fstPrim = Platon.cubeCreate(fstMtlPtn, 0.5);}).then(() => {
      draw();});
  } 

  window.addEventListener("load", () => {
    main();
  });

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbWF0aC9tYXQ0LmpzIiwiLi4vbWF0aC92ZWMzLmpzIiwiLi4vbWF0aC9jYW1lcmEuanMiLCIuLi9yZW5kZXIvcmVuZF9kZWYuanMiLCIuLi9yZW5kZXIvcmVzL3NoYWRlcnMuanMiLCIuLi9yZW5kZXIvcmVzL21hdGVyaWFsX3BhdHRlcm4uanMiLCIuLi9yZW5kZXIvcmVzL3ByaW0uanMiLCIuLi9yZW5kZXIvcmVzL3ZlcnRleC5qcyIsIi4uL3JlbmRlci9yZXMvZmlndXJlcy5qcyIsIi4uL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgX21hdDQge1xyXG4gIG0gPSBcclxuICBbXHJcbiAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICBbMCwgMCwgMCwgMV1cclxuICBdO1xyXG4gIFxyXG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxICYmICBBcnJheS5pc0FycmF5KGFyZ3NbMF0pICYmIHR5cGVvZiBhcmdzWzBdWzBdID09IFwibnVtYmVyXCIpXHJcbiAgICAgIHRoaXMubSA9IFxyXG4gICAgICBbXHJcbiAgICAgICAgW2FyZ3NbMF1bMF0sIGFyZ3NbMF1bMV0sIGFyZ3NbMF1bMl0sIGFyZ3NbMF1bM11dLFxyXG4gICAgICAgIFthcmdzWzBdWzRdLCBhcmdzWzBdWzVdLCBhcmdzWzBdWzZdLCBhcmdzWzBdWzddXSxcclxuICAgICAgICBbYXJnc1swXVs4XSwgYXJnc1swXVs5XSwgYXJnc1swXVsxMF0sIGFyZ3NbMF1bMTFdXSxcclxuICAgICAgICBbYXJnc1swXVsxMl0sIGFyZ3NbMF1bMTNdLCBhcmdzWzBdWzE0XSwgYXJnc1swXVsxNV1dXHJcbiAgICAgIF07XHJcbiAgICAgIC8qZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzWzBdW2kgKiA0ICsgal07Ki9cclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIiAmJiAhQXJyYXkuaXNBcnJheShhcmdzWzBdKSlcclxuICAgICAgdGhpcy5tID0gXHJcbiAgICAgIFtcclxuICAgICAgICBbYXJnc1swXS5tWzBdWzBdLCBhcmdzWzBdLm1bMF1bMV0sIGFyZ3NbMF0ubVswXVsyXSwgYXJnc1swXS5tWzBdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzFdWzBdLCBhcmdzWzBdLm1bMV1bMV0sIGFyZ3NbMF0ubVsxXVsyXSwgYXJnc1swXS5tWzFdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzJdWzBdLCBhcmdzWzBdLm1bMl1bMV0sIGFyZ3NbMF0ubVsyXVsyXSwgYXJnc1swXS5tWzJdWzNdXSxcclxuICAgICAgICBbYXJnc1swXS5tWzNdWzBdLCBhcmdzWzBdLm1bM11bMV0sIGFyZ3NbMF0ubVszXVsyXSwgYXJnc1swXS5tWzNdWzNdXSxcclxuICAgICAgXTtcclxuICAgIGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgYXJnc1swXS5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF1bMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1swXVtpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gNCAmJiBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgdGhpcy5tW2ldW2pdID0gYXJnc1tpXVtqXTtcclxuICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMTYpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKylcclxuICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNDsgaisrKVxyXG4gICAgICAgICAgICB0aGlzLm1baV1bal0gPSBhcmdzW2kgKiA0ICsgal07XHJcbiAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDEgJiYgdHlwZW9mIGFyZ3NbMF0gPT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKVxyXG4gICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCA0OyBqKyspXHJcbiAgICAgICAgICAgIHRoaXMubVtpXVtqXSA9IGFyZ3NbMF07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzZXRJZGVudGl0eSgpIHtcclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbMSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAxLCAwLCAwXSxcclxuICAgICAgWzAsIDAsIDEsIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICBpZGVudGl0eSgpIHtcclxuICAgIHJldHVybiBuZXcgX21hdDQoKTtcclxuICB9XHJcblxyXG4gIGRldGVybSgpIHtcclxuICAgIHJldHVybiB0aGlzLm1bMF1bMF0gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgK1xyXG4gICAgICAgICAgLXRoaXMubVswXVsxXSAqIG1hdHJEZXRlcm0zeDModGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSArXHJcbiAgICAgICAgICArdGhpcy5tWzBdWzJdICogbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pICtcclxuICAgICAgICAgIC10aGlzLm1bMF1bM10gKiBtYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSk7XHJcbiAgfVxyXG5cclxuICBzZXRUcmFuc2xhdGUodikge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIDEsIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFt2LngsIHYueSwgdi56LCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh2KSB7XHJcbiAgICByZXR1cm4gbWF0NChbMSwgMCwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgICAgICAgICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgICAgICAgICAgICBbdi54LCB2LnksIHYueiwgMV0pO1xyXG4gIH1cclxuXHJcbiAgbXVsTWF0cihhKVxyXG4gIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG5cclxuICAgIHIubVswXVswXSA9IHRoaXMubVswXVswXSAqIGEubVswXVswXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bMF1bMV0gPSB0aGlzLm1bMF1bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bMF1bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bMF1bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bMF1bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzBdWzJdID0gdGhpcy5tWzBdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzBdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzBdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzBdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVswXVszXSA9IHRoaXMubVswXVswXSAqIGEubVswXVszXSArIHRoaXMubVswXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVswXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVswXVszXSAqIGEubVszXVszXTtcclxuXHJcblxyXG4gICAgci5tWzFdWzBdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzBdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzBdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzBdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzBdO1xyXG5cclxuICAgIHIubVsxXVsxXSA9IHRoaXMubVsxXVswXSAqIGEubVswXVsxXSArIHRoaXMubVsxXVsxXSAqIGEubVsxXVsxXSArIHRoaXMubVsxXVsyXSAqIGEubVsyXVsxXSArXHJcbiAgICAgIHRoaXMubVsxXVszXSAqIGEubVszXVsxXTtcclxuXHJcbiAgICByLm1bMV1bMl0gPSB0aGlzLm1bMV1bMF0gKiBhLm1bMF1bMl0gKyB0aGlzLm1bMV1bMV0gKiBhLm1bMV1bMl0gKyB0aGlzLm1bMV1bMl0gKiBhLm1bMl1bMl0gK1xyXG4gICAgICB0aGlzLm1bMV1bM10gKiBhLm1bM11bMl07XHJcblxyXG4gICAgci5tWzFdWzNdID0gdGhpcy5tWzFdWzBdICogYS5tWzBdWzNdICsgdGhpcy5tWzFdWzFdICogYS5tWzFdWzNdICsgdGhpcy5tWzFdWzJdICogYS5tWzJdWzNdICtcclxuICAgICAgdGhpcy5tWzFdWzNdICogYS5tWzNdWzNdO1xyXG5cclxuXHJcbiAgICByLm1bMl1bMF0gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bMF0gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bMF0gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bMF0gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bMF07XHJcblxyXG4gICAgci5tWzJdWzFdID0gdGhpcy5tWzJdWzBdICogYS5tWzBdWzFdICsgdGhpcy5tWzJdWzFdICogYS5tWzFdWzFdICsgdGhpcy5tWzJdWzJdICogYS5tWzJdWzFdICtcclxuICAgICAgdGhpcy5tWzJdWzNdICogYS5tWzNdWzFdO1xyXG5cclxuICAgIHIubVsyXVsyXSA9IHRoaXMubVsyXVswXSAqIGEubVswXVsyXSArIHRoaXMubVsyXVsxXSAqIGEubVsxXVsyXSArIHRoaXMubVsyXVsyXSAqIGEubVsyXVsyXSArXHJcbiAgICAgIHRoaXMubVsyXVszXSAqIGEubVszXVsyXTtcclxuXHJcbiAgICByLm1bMl1bM10gPSB0aGlzLm1bMl1bMF0gKiBhLm1bMF1bM10gKyB0aGlzLm1bMl1bMV0gKiBhLm1bMV1bM10gKyB0aGlzLm1bMl1bMl0gKiBhLm1bMl1bM10gK1xyXG4gICAgICB0aGlzLm1bMl1bM10gKiBhLm1bM11bM107XHJcblxyXG5cclxuICAgIHIubVszXVswXSA9IHRoaXMubVszXVswXSAqIGEubVswXVswXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVswXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVswXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVswXTtcclxuXHJcbiAgICByLm1bM11bMV0gPSB0aGlzLm1bM11bMF0gKiBhLm1bMF1bMV0gKyB0aGlzLm1bM11bMV0gKiBhLm1bMV1bMV0gKyB0aGlzLm1bM11bMl0gKiBhLm1bMl1bMV0gK1xyXG4gICAgICB0aGlzLm1bM11bM10gKiBhLm1bM11bMV07XHJcblxyXG4gICAgci5tWzNdWzJdID0gdGhpcy5tWzNdWzBdICogYS5tWzBdWzJdICsgdGhpcy5tWzNdWzFdICogYS5tWzFdWzJdICsgdGhpcy5tWzNdWzJdICogYS5tWzJdWzJdICtcclxuICAgICAgdGhpcy5tWzNdWzNdICogYS5tWzNdWzJdO1xyXG5cclxuICAgIHIubVszXVszXSA9IHRoaXMubVszXVswXSAqIGEubVswXVszXSArIHRoaXMubVszXVsxXSAqIGEubVsxXVszXSArIHRoaXMubVszXVsyXSAqIGEubVsyXVszXSArXHJcbiAgICAgIHRoaXMubVszXVszXSAqIGEubVszXVszXTtcclxuXHJcbiAgICByZXR1cm4gcjtcclxuICB9XHJcblxyXG4gIGludmVyc2UoKSB7XHJcbiAgICBsZXQgciA9IG1hdDQoKTtcclxuICAgIGxldCBkZXQgPSB0aGlzLmRldGVybSgpO1xyXG5cclxuICAgIGlmIChkZXQgPT0gMClcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIC8qIGJ1aWxkIGFkam9pbnQgbWF0cml4ICovXHJcbiAgICByLm1bMF1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMF0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMF0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMF1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMV0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMV0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMl1bMF0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMl0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzJdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzJdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzNdWzBdLCB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSkgLyBkZXQ7XHJcblxyXG5cclxuICAgIHIubVswXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVszXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVszXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0pIC8gZGV0O1xyXG5cclxuICAgIHJldHVybiByO1xyXG4gIH1cclxuXHJcbiAgc2V0SW52ZXJzZSgpIHtcclxuICAgIGxldCByID0gbWF0NCgpO1xyXG4gICAgbGV0IGRldCA9IHRoaXMuZGV0ZXJtKCk7XHJcblxyXG4gICAgaWYgKGRldCA9PSAwKVxyXG4gICAgICB0aGlzLnNldElkZW50aXR5KCk7XHJcblxyXG4gICAgLyogYnVpbGQgYWRqb2ludCBtYXRyaXggKi9cclxuICAgIHIubVswXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVswXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVswXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVsxXVswXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuICAgIHIubVswXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVsxXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsxXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzJdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzJdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVsyXVsxXSA9XHJcbiAgICAgIC1tYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bM10sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bM10pIC8gZGV0O1xyXG5cclxuICAgIHIubVszXVsxXSA9XHJcbiAgICAgICttYXRyRGV0ZXJtM3gzKHRoaXMubVswXVswXSwgdGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVsyXVswXSwgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgIHRoaXMubVszXVswXSwgdGhpcy5tWzNdWzFdLCB0aGlzLm1bM11bMl0pIC8gZGV0O1xyXG5cclxuXHJcbiAgICByLm1bMF1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMV0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMV1bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsyXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsyXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsyXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bMl1bMl0gPVxyXG4gICAgICArbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzNdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzNdKSAvIGRldDtcclxuXHJcbiAgICByLm1bM11bMl0gPVxyXG4gICAgICAtbWF0ckRldGVybTN4Myh0aGlzLm1bMF1bMF0sIHRoaXMubVswXVsxXSwgdGhpcy5tWzBdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bMV1bMF0sIHRoaXMubVsxXVsxXSwgdGhpcy5tWzFdWzJdLFxyXG4gICAgICAgICAgICAgICAgICAgICB0aGlzLm1bM11bMF0sIHRoaXMubVszXVsxXSwgdGhpcy5tWzNdWzJdKSAvIGRldDtcclxuXHJcblxyXG4gICAgci5tWzBdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzFdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzFdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzFdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMl0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzJdWzNdID1cclxuICAgICAgLW1hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVszXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVszXSkgLyBkZXQ7XHJcblxyXG4gICAgci5tWzNdWzNdID1cclxuICAgICAgK21hdHJEZXRlcm0zeDModGhpcy5tWzBdWzBdLCB0aGlzLm1bMF1bMV0sIHRoaXMubVswXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzFdWzBdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAgdGhpcy5tWzJdWzBdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVsyXVsyXSkgLyBkZXQ7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgNCA7IGorKylcclxuICAgICAgICB0aGlzLm1baV1bal0gPSByLm1baV1bal07XHJcbiAgfVxyXG5cclxuICByb3RhdGUoYW5nbGUsIHYpIHtcclxuICAgIGxldCBhID0gYW5nbGUgKiBNYXRoLlBJIC8gMTgwLCBzID0gTWF0aC5zaW4oYSksIGMgPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICByZXR1cm4gbWF0NChcclxuICAgICAgICBjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwLFxyXG4gICAgICAgIHYueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDAsXHJcbiAgICAgICAgdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMCxcclxuICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZShhbmdsZSwgdikge1xyXG4gICAgbGV0IGEgPSBhbmdsZSAqIE1hdGguUEkgLyAxODAsIHMgPSBNYXRoLnNpbihhKSwgYyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtjICsgdi54ICogdi54ICogKDEgLSBjKSwgdi55ICogdi54ICogKDEgLSBjKSAtIHYueiAqIHMsIHYueiAqIHYueCAqICgxIC0gYykgKyB2LnkgKiBzLCAwXSxcclxuICAgICAgW3YueCAqIHYueSAqICgxIC0gYykgKyB2LnogKiBzLCBjICsgdi55ICogdi55ICogKDEgLSBjKSwgdi56ICogdi55ICogKDEgLSBjKSAtIHYueCAqIHMsIDBdLFxyXG4gICAgICBbdi54ICogdi56ICogKDEgLSBjKSAtIHYueSAqIHMsIHYueSAqIHYueiAqICgxIC0gYykgKyB2LnggKiBzLCBjICsgdi56ICogdi56ICogKDEgLSBjKSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHZpZXcoTG9jLCBBdCwgVXAxKSB7XHJcbiAgICBsZXRcclxuICAgICAgRGlyID0gQXQuc3ViVmVjKExvYykubm9ybWFsaXplKCksXHJcbiAgICAgIFJpZ2h0ID0gRGlyLmNyb3NzKFVwMSkubm9ybWFsaXplKCksXHJcbiAgICAgIFVwID0gUmlnaHQuY3Jvc3MoRGlyKS5ub3JtYWxpemUoKTtcclxuICAgIFxyXG4gICAgcmV0dXJuIG1hdDQoUmlnaHQueCwgVXAueCwgLURpci54LCAwLFxyXG4gICAgICAgICAgICAgICAgIFJpZ2h0LnksIFVwLnksIC1EaXIueSwgMCxcclxuICAgICAgICAgICAgICAgICBSaWdodC56LCBVcC56LCAtRGlyLnosIDAsXHJcbiAgICAgICAgICAgICAgICAgLUxvYy5kb3QoUmlnaHQpLCAtTG9jLmRvdChVcCksIExvYy5kb3QoRGlyKSwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRWaWV3KExvYywgQXQsIFVwMSkge1xyXG4gICAgbGV0XHJcbiAgICAgIERpciA9IEF0LnN1YlZlYyhMb2MpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBSaWdodCA9IERpci5jcm9zcyhVcDEpLm5vcm1hbGl6ZSgpLFxyXG4gICAgICBVcCA9IFJpZ2h0LmNyb3NzKERpcikubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFtSaWdodC54LCBVcC54LCAtRGlyLngsIDBdLFxyXG4gICAgICBbUmlnaHQueSwgVXAueSwgLURpci55LCAwXSxcclxuICAgICAgW1JpZ2h0LnosIFVwLnosIC1EaXIueiwgMF0sXHJcbiAgICAgIFstTG9jLmRvdChSaWdodCksIC1Mb2MuZG90KFVwKSwgTG9jLmRvdChEaXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHJldHVybiBtYXQ0KCgyICogbmVhcikgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgICAwLCAoMiAqIG5lYXIpIC8gKHRvcCAtIGJvdHRvbSksIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAgKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgKHRvcCArIGJvdHRvbSkgLyAodG9wIC0gYm90dG9tKSwgKC0oKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpKSksICgtMSksXHJcbiAgICAgICAgICAgICAgICAgMCwgMCwgKC0oKDIgKiBuZWFyICogZmFyKSAvIChmYXIgLSBuZWFyKSkpLCAwKTtcclxuICB9XHJcblxyXG4gIHNldEZydXN0dW0obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpIHtcclxuICAgIHRoaXMubSA9XHJcbiAgICBbXHJcbiAgICAgIFsoMiAqIG5lYXIpIC8gKHJpZ2h0IC0gbGVmdCksIDAsIDAsIDBdLFxyXG4gICAgICBbMCwgKDIgKiBuZWFyKSAvICh0b3AgLSBib3R0b20pLCAwLCAwXSxcclxuICAgICAgWyhyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksICh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksICgtKChmYXIgKyBuZWFyKSAvIChmYXIgLSBuZWFyKSkpLCAoLTEpXSxcclxuICAgICAgWzAsIDAsICgtKCgyICogbmVhciAqIGZhcikgLyAoZmFyIC0gbmVhcikpKSwgMF1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICB0cmFuc3Bvc2UoKSB7XHJcbiAgICByZXR1cm4gbWF0NCh0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF0sXHJcbiAgICAgIHRoaXMubVswXVsxXSwgdGhpcy5tWzFdWzFdLCB0aGlzLm1bMl1bMV0sIHRoaXMubVszXVsxXSxcclxuICAgICAgdGhpcy5tWzBdWzJdLCB0aGlzLm1bMV1bMl0sIHRoaXMubVsyXVsyXSwgdGhpcy5tWzNdWzJdLFxyXG4gICAgICB0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM10pO1xyXG4gIH1cclxuXHJcbiAgc2V0VHJhbnNwb3NlKCkge1xyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFt0aGlzLm1bMF1bMF0sIHRoaXMubVsxXVswXSwgdGhpcy5tWzJdWzBdLCB0aGlzLm1bM11bMF1dLFxyXG4gICAgICBbdGhpcy5tWzBdWzFdLCB0aGlzLm1bMV1bMV0sIHRoaXMubVsyXVsxXSwgdGhpcy5tWzNdWzFdXSxcclxuICAgICAgW3RoaXMubVswXVsyXSwgdGhpcy5tWzFdWzJdLCB0aGlzLm1bMl1bMl0sIHRoaXMubVszXVsyXV0sXHJcbiAgICAgIFt0aGlzLm1bMF1bM10sIHRoaXMubVsxXVszXSwgdGhpcy5tWzJdWzNdLCB0aGlzLm1bM11bM11dXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcm90YXRlWChhbmdsZUluRGVncmVlKSB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHJldHVybiBtYXQ0KDEsIDAsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCBjbywgc2ksIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAtc2ksIGNvLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgMCwgMSk7XHJcbiAgfVxyXG5cclxuICBzZXRSb3RhdGVYKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgdGhpcy5tID0gXHJcbiAgICBbXHJcbiAgICAgIFsxLCAwLCAwLCAwXSxcclxuICAgICAgWzAsIGNvLCBzaSwgMF0sXHJcbiAgICAgIFswLCAtc2ksIGNvLCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdOyAgXHJcbiAgfVxyXG5cclxuICByb3RhdGVZKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIDAsIC1zaSwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDEsIDAsIDAsXHJcbiAgICAgICAgICAgICAgICBzaSwgMCwgY28sIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVkoYW5nbGVJbkRlZ3JlZSkge1xyXG4gICAgbGV0IGEgPSBhbmdsZUluRGVncmVlICogTWF0aC5QSSAvIDE4MCwgc2kgPSBNYXRoLnNpbihhKSwgY28gPSBNYXRoLmNvcyhhKTtcclxuXHJcbiAgICB0aGlzLm0gPSBcclxuICAgIFtcclxuICAgICAgW2NvLCAwLCAtc2ksIDBdLFxyXG4gICAgICBbMCwgMSwgMCwgMF0sXHJcbiAgICAgIFtzaSwgMCwgY28sIDBdLFxyXG4gICAgICBbMCwgMCwgMCwgMV1cclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByb3RhdGVaKGFuZ2xlSW5EZWdyZWUpIHtcclxuICAgIGxldCBhID0gYW5nbGVJbkRlZ3JlZSAqIE1hdGguUEkgLyAxODAsIHNpID0gTWF0aC5zaW4oYSksIGNvID0gTWF0aC5jb3MoYSk7XHJcblxyXG4gICAgcmV0dXJuIG1hdDQoY28sIHNpLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgLXNpLCBjbywgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDEsIDAsXHJcbiAgICAgICAgICAgICAgICAwLCAwLCAwLCAxKTtcclxuICB9XHJcblxyXG4gIHNldFJvdGF0ZVooYW5nbGVJbkRlZ3JlZSlcclxuICB7XHJcbiAgICBsZXQgYSA9IGFuZ2xlSW5EZWdyZWUgKiBNYXRoLlBJIC8gMTgwLCBzaSA9IE1hdGguc2luKGEpLCBjbyA9IE1hdGguY29zKGEpO1xyXG5cclxuICAgIHRoaXMubSA9IFxyXG4gICAgW1xyXG4gICAgICBbY28sIHNpLCAwLCAwXSxcclxuICAgICAgWy1zaSwgY28sIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgMSwgMF0sXHJcbiAgICAgIFswLCAwLCAwLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHNjYWxlKHYpIHtcclxuICAgIHJldHVybiBtYXQ0KHYueCwgMCwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIHYueSwgMCwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIHYueiwgMCxcclxuICAgICAgICAgICAgICAgIDAsIDAsIDAsIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0U2NhbGUodikge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgW3YueCwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCB2LnksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgdi56LCAwXSxcclxuICAgICAgWzAsIDAsIDAsIDFdXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgb3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgcmV0dXJuIG1hdDQoMiAvIChyaWdodCAtIGxlZnQpLCAwLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMiAvICh0b3AgLSBib3R0b20pLCAwLCAwLFxyXG4gICAgICAgICAgICAgICAgMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDAsXHJcbiAgICAgICAgICAgICAgICAtKHJpZ2h0ICsgbGVmdCkgLyAocmlnaHQgLSBsZWZ0KSwgLSh0b3AgKyBib3R0b20pIC8gKHRvcCAtIGJvdHRvbSksIC0oZmFyICsgbmVhcikgLyAoZmFyIC0gbmVhciksIDEpO1xyXG4gIH1cclxuXHJcbiAgc2V0T3J0aG8obGVmdCwgcmlnaHQsIGJvdHRvbSwgdG9wLCBuZWFyLCBmYXIpXHJcbiAge1xyXG4gICAgdGhpcy5tID1cclxuICAgIFtcclxuICAgICAgWzIgLyAocmlnaHQgLSBsZWZ0KSwgMCwgMCwgMF0sXHJcbiAgICAgIFswLCAyIC8gKHRvcCAtIGJvdHRvbSksIDAsIDBdLFxyXG4gICAgICBbMCwgMCwgLTIgLyAoZmFyIC0gbmVhciksIDBdLFxyXG4gICAgICBbLShyaWdodCArIGxlZnQpIC8gKHJpZ2h0IC0gbGVmdCksIC0odG9wICsgYm90dG9tKSAvICh0b3AgLSBib3R0b20pLCAtKGZhciArIG5lYXIpIC8gKGZhciAtIG5lYXIpLCAxXVxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW10uY29uY2F0KC4uLnRoaXMubSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWF0NCguLi5hcmdzKSB7XHJcbiAgcmV0dXJuIG5ldyBfbWF0NCguLi5hcmdzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWF0ckRldGVybTN4MyhhMTEsIGExMiwgYTEzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgIGEyMSwgYTIyLCBhMjMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgYTMxLCBhMzIsIGEzMykge1xyXG4gIHJldHVybiBhMTEgKiBhMjIgKiBhMzMgKyBhMTIgKiBhMjMgKiBhMzEgKyBhMTMgKiBhMjEgKiBhMzIgLVxyXG4gICAgICAgICBhMTEgKiBhMjMgKiBhMzIgLSBhMTIgKiBhMjEgKiBhMzMgLSBhMTMgKiBhMjIgKiBhMzE7XHJcbn1cclxuIiwiY2xhc3MgX3ZlYzMge1xyXG4gIHg7XHJcbiAgeTtcclxuICB6O1xyXG5cclxuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7IFxyXG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAzKVxyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLCB0aGlzLnkgPSBhcmdzWzFdLCB0aGlzLnogPSBhcmdzWzJdO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIGFyZ3NbMF0gPT0gXCJvYmplY3RcIikge1xyXG4gICAgICB0aGlzLnggPSBhcmdzWzBdLngsIHRoaXMueSA9IGFyZ3NbMF0ueSwgdGhpcy56ID0gYXJnc1swXS56OyBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMueCA9IGFyZ3NbMF0sIHRoaXMueSA9IGFyZ3NbMF0sIHRoaXMueiA9IGFyZ3NbMF07IFxyXG4gICAgfVxyXG4gIH0gLy8gRW5kIG9mICdjb25zdHJ1Y3RvcicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG11bHRpcGx1ZSBieSBudW1iZXIgZnVuY3Rpb25cclxuICBtdWxOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBudW0sIHRoaXMueSAqIG51bSwgdGhpcy56ICogbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnbXVsTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgZGl2aWRlIGJ5IG51bWJlciBmdW5jdGlvblxyXG4gIGRpdk51bShudW0pIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCAvIG51bSwgdGhpcy55IC8gbnVtLCB0aGlzLnogLyBudW0pO1xyXG4gIH0gLy8gRW5kIG9mICdkdXZOdW0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBhZGQgbnVtYmVyIGZ1bmN0aW9uXHJcbiAgYWRkTnVtKG51bSkge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICsgbnVtLCB0aGlzLnkgKyBudW0sIHRoaXMueiArIG51bSk7XHJcbiAgfSAvLyBFbmQgb2YgJ2FkZE51bScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHN1YnN0cmFjdCBudW1iZXIgZnVuY3Rpb25cclxuICBzdWJOdW0obnVtKSB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggLSBudW0sIHRoaXMueSAtIG51bSwgdGhpcy56IC0gbnVtKTtcclxuICB9IC8vIEVuZCBvZiAnc3ViTnVtJyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgYWRkIHZlY3RvciBmdW5jdGlvblxyXG4gIGFkZFZlYyh2ZWMpIHtcclxuICAgIHJldHVybiB2ZWMzKHRoaXMueCArIHZlYy54LCB0aGlzLnkgKyB2ZWMueSwgdGhpcy56ICsgdmVjLnopO1xyXG4gIH0gLy8gRW5kIG9mICdhZGRWZWMnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzdWJzdHJhY3QgdmVjdG9yIGZ1bmN0aW9uXHJcbiAgc3ViVmVjKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54IC0gdmVjLngsIHRoaXMueSAtIHZlYy55LCB0aGlzLnogLSB2ZWMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ3N1YlZlYycgZnVuY3Rpb25cclxuXHJcbiAgLy8gTWFrZSB2ZWN0b3IgbmVnYXRpdmUgdmVjdG9yXHJcbiAgbmVnKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoLXRoaXMueCwgLXRoaXMueSwgLXRoaXMueik7XHJcbiAgfSAvLyBFbmQgb2YgJ25lZycgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIGRvdCBwcm9kdWN0IGZ1bmN0aW9uXHJcbiAgZG90KHZlYykge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIHZlYy54ICsgdGhpcy55ICogdmVjLnkgKyB0aGlzLnogKiB2ZWMuejtcclxuICB9IC8vIEVuZCBvZiAnZG90JyBmdW5jdGlvblxyXG5cclxuICAvLyBWZWN0b3IgY3Jvc3MgcHJvZHVjdCBmdW5jdGlvblxyXG4gIGNyb3NzKHZlYykge1xyXG4gICAgcmV0dXJuIHZlYzMoXHJcbiAgICAgIHRoaXMueSAqIHZlYy56IC0gdGhpcy56ICogdmVjLnksXHJcbiAgICAgIHRoaXMueiAqIHZlYy54IC0gdGhpcy54ICogdmVjLnosXHJcbiAgICAgIHRoaXMueCAqIHZlYy55IC0gdGhpcy55ICogdmVjLngpO1xyXG4gIH0gLy8gRW5kIG9mICdjcm9zcycgZnVuY3Rpb25cclxuICBcclxuICAvLyBWZWN0b3IgbGVuZ2h0IGV2YXVsYXRpbmcgZnVuY3Rpb25cclxuICBsZW4oKSB7XHJcbiAgICBsZXQgbGVuID0gdGhpcy5kb3QodGhpcyk7XHJcblxyXG4gICAgaWYgKGxlbiA9PSAwIHx8IGxlbiA9PSAxKVxyXG4gICAgICByZXR1cm4gbGVuO1xyXG5cclxuICAgIHJldHVybiBNYXRoLnNxcnQobGVuKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuJyBmdW5jdGlvblxyXG5cclxuICAvLyBTcXVhcmUgb2YgdmVjdG9yIGxlbmdodCBldmF1bGF0aW5nIGZ1bmN0aW9uXHJcbiAgbGVuMigpIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9IC8vIEVuZCBvZiAnbGVuMicgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIG5vcm1hbGl6aW5nIGZ1bmN0aW9uXHJcbiAgbm9ybWFsaXplKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZGl2TnVtKHRoaXMubGVuKCkpO1xyXG4gIH0gLy8gRW5kIG9mICdub3JtYWxpemUnIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBzZXR0aW5nIG5vcm1hbGl6ZSBmdW5jdGlvblxyXG4gIHNldE5vcm1hbGl6ZSgpIHtcclxuICAgIGxldCBsID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICB0aGlzLnggLz0gbDtcclxuICAgIHRoaXMueSAvPSBsO1xyXG4gICAgdGhpcy56IC89IGw7XHJcbiAgfSAvLyBFbmQgb2YgJ25vcm1hbGl6ZScgZnVuY3Rpb25cclxuXHJcbiAgLy8gVmVjdG9yIHRyYW5zZm9ybSBieSBtYXRyaXggZnVuY3Rpb25cclxuICB2ZWN0b3JUcmFuc2Zvcm0oYSlcclxuICB7XHJcbiAgICByZXR1cm4gdmVjMyh0aGlzLnggKiBhLm1bMF1bMF0gKyB0aGlzLnkgKiBhLm1bMV1bMF0gKyB0aGlzLnogKiBhLm1bMl1bMF0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMV0gKyB0aGlzLnkgKiBhLm1bMV1bMV0gKyB0aGlzLnogKiBhLm1bMl1bMV0sXHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICd2ZWN0b3JUcmFuc2Zvcm0nIGZ1bmN0aW9uXHJcblxyXG4gIC8vIFZlY3RvciBtdWx0aXBsdWUgYnkgbWF0cml4IGZ1bmN0aW9uXHJcbiAgbXVsTWF0cihtKVxyXG4gIHtcclxuICAgIGxldCB3ID0gdGhpcy54ICogYS5tWzBdWzNdICsgdGhpcy55ICogYS5tWzFdWzNdICsgdGhpcy56ICogYS5tWzJdWzNdICsgYS5tWzNdWzNdO1xyXG4gIFxyXG4gICAgcmV0dXJuIHZlYzMoKHRoaXMueCAqIGEubVswXVswXSArIHRoaXMueSAqIGEubVsxXVswXSArIHRoaXMueiAqIGEubVsyXVswXSArIGEubVszXVswXSkgLyB3LFxyXG4gICAgICAgICAgICAgICAgICAodGhpcy54ICogYS5tWzBdWzFdICsgdGhpcy55ICogYS5tWzFdWzFdICsgdGhpcy56ICogYS5tWzJdWzFdICsgYS5tWzNdWzFdKSAvIHcsXHJcbiAgICAgICAgICAgICAgICAgICh0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pIC8gdyk7XHJcbiAgfSAvLyBFbmQgb2YgJ211bE1hdHInIGZ1bmN0aW9uXHJcblxyXG4gIHBvaW50VHJhbnNmb3JtKG0pXHJcbiAge1xyXG4gICAgcmV0dXJuIHZlYzModGhpcy54ICogYS5tWzBdWzBdICsgdGhpcy55ICogYS5tWzFdWzBdICsgdGhpcy56ICogYS5tWzJdWzBdICsgYS5tWzNdWzBdLFxyXG4gICAgICAgICAgICAgIHRoaXMueCAqIGEubVswXVsxXSArIHRoaXMueSAqIGEubVsxXVsxXSArIHRoaXMueiAqIGEubVsyXVsxXSArIGEubVszXVsxXSxcclxuICAgICAgICAgICAgICB0aGlzLnggKiBhLm1bMF1bMl0gKyB0aGlzLnkgKiBhLm1bMV1bMl0gKyB0aGlzLnogKiBhLm1bMl1bMl0gKyBhLm1bM11bMl0pO1xyXG4gIH0gLy8gRW5kIG9mICdwb2ludFRyYW5zZm9ybScgZnVuY3Rpb25cclxufVxyXG5cclxuLy8gVmVjdG9yIHNldHRpbmcgZnVuY3Rpb25cclxuZXhwb3J0IGZ1bmN0aW9uIHZlYzMoLi4uYXJncykge1xyXG4gIHJldHVybiBuZXcgX3ZlYzMoLi4uYXJncyk7XHJcbn0gLy8gRW5kIG9mICd2ZWMzJyBmdW5jdGlvblxyXG4iLCJpbXBvcnQgeyBtYXQ0IH0gZnJvbSBcIi4uL21hdGgvbWF0NC5qc1wiXHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCJcclxuXHJcbmNsYXNzIF9jYW1lcmEge1xyXG4gIGxvYzsgICAvKiBDYW1lcmEgbG9jYXRpb24gKi9cclxuICBhdDsgICAgLyogQ2FtZXJhIGxvb2stYXQgcG9pbnQgKi9cclxuICBkaXI7ICAgLyogQ2FtZXJhIGRpcmVjdGlvbiAqL1xyXG4gIHJpZ2h0OyAvKiBDYW1lcmEgcmlnaHQgZGlyZWN0aW9uICovXHJcbiAgdXA7ICAgIC8qIENhbWVyYSB1cCBkaXJlY3Rpb24gKi9cclxuXHJcbiAgbWF0clZpZXc7IC8qIFZpZXcgbWF0cml4ICovXHJcbiAgbWF0clByb2o7IC8qIFByb2plY3Rpb24gbWF0cml4ICovXHJcbiAgbWF0clZQOyAgIC8qIFN0b3JlZCAoVmlldyAqIFByb2opIG1hdHJpeCAqL1xyXG5cclxuICBmcmFtZVc7IC8qIEZyYW1lIHdpZHRoIChpbiBwaXhlbHMpICovXHJcbiAgZnJhbWVIOyAvKiBGcmFtZSBoZWlnaHQgKGluIHBpeGVscykgKi9cclxuXHJcbiAgd3A7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAod2lkdGgpICovXHJcbiAgaHA7ICAgICAgICAgIC8qIFByb2plY3QgcGxhbmUgc2l6ZSAoaGVpZ2h0KSAqL1xyXG4gIHByb2pTaXplOyAgICAvKiBQcm9qZWN0IHBsYW5lIGZpdCBzcXVhcmUgKi9cclxuICBwcm9qRGlzdDsgICAgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBwbGFuZSBmcm9tIHZpZXdlciAobmVhcikgKi9cclxuICBwcm9qRmFyQ2xpcDsgLyogRGlzdGFuY2UgdG8gcHJvamVjdCBmb3IgY2xpcCBwbGFuZSAoZmFyKSAqL1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMubWF0clByb2ogPSBtYXQ0KCk7XHJcbiAgICB0aGlzLm1hdHJWaWV3ID0gbWF0NCgpO1xyXG4gICAgdGhpcy5tYXRyVlAgPSBtYXQ0KCk7XHJcblxyXG4gICAgdGhpcy5mcmFtZUggPSAxMDAwO1xyXG4gICAgdGhpcy5mcmFtZVcgPSAxMDAwO1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSAwLjEwO1xyXG4gICAgdGhpcy5wcm9qRmFyQ2xpcCA9IDMwMDtcclxuICAgIHRoaXMucHJvalNpemUgPSAwLjE7XHJcbiAgfVxyXG4gIHNldChsb2MsIGF0LCB1cClcclxuICB7XHJcbiAgICB0aGlzLm1hdHJWaWV3LnNldFZpZXcobG9jLCBhdCwgdXApO1xyXG5cclxuICAgIHRoaXMucmlnaHQgPSB2ZWMzKHRoaXMubWF0clZpZXcubVswXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsxXVswXSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMubWF0clZpZXcubVsyXVswXSk7XHJcbiAgICB0aGlzLnVwID0gdmVjMyh0aGlzLm1hdHJWaWV3Lm1bMF1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMV1bMV0sXHJcbiAgICAgICAgICAgICAgICAgICB0aGlzLm1hdHJWaWV3Lm1bMl1bMV0pO1xyXG4gICAgdGhpcy5kaXIgPSB2ZWMzKC10aGlzLm1hdHJWaWV3Lm1bMF1bMl0sXHJcbiAgICAgICAgICAgICAgICAgICAgLXRoaXMubWF0clZpZXcubVsxXVsyXSxcclxuICAgICAgICAgICAgICAgICAgICAtdGhpcy5tYXRyVmlldy5tWzJdWzJdKTtcclxuICAgIHRoaXMubG9jID0gdmVjMyhsb2MpO1xyXG4gICAgdGhpcy5hdCA9IHZlYzMoYXQpO1xyXG5cclxuICAgIHRoaXMubWF0clZQID0gdGhpcy5tYXRyVmlldy5tdWxNYXRyKHRoaXMubWF0clByb2opO1xyXG4gIH0gLy8gRW5kIG9mICdzZXQnIGZ1bmN0aW9uXHJcblxyXG4gIHNldFByb2oocHJvalNpemUsIHByb2pEaXN0LCBwcm9qRmFyQ2xpcClcclxuICB7XHJcbiAgICBsZXQgcngsIHJ5O1xyXG5cclxuICAgIHRoaXMucHJvakRpc3QgPSBwcm9qRGlzdDtcclxuICAgIHRoaXMucHJvakZhckNsaXAgPSBwcm9qRmFyQ2xpcDtcclxuICAgIHJ4ID0gcnkgPSB0aGlzLnByb2pTaXplID0gcHJvalNpemU7XHJcblxyXG4gICAgLyogQ29ycmVjdCBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGlmICh0aGlzLmZyYW1lVyA+PSB0aGlzLmZyYW1lSClcclxuICAgICAgcnggKj0gdGhpcy5mcmFtZVcgLyB0aGlzLmZyYW1lSDtcclxuICAgIGVsc2VcclxuICAgICAgcnkgKj0gdGhpcy5mcmFtZUggLyB0aGlzLmZyYW1lVztcclxuXHJcbiAgICB0aGlzLndwID0gcng7XHJcbiAgICB0aGlzLmhwID0gcnk7XHJcbiAgICB0aGlzLm1hdHJQcm9qLnNldEZydXN0dW0oLXJ4IC8gMiwgcnggLyAyLCAtcnkgLyAyLCByeSAvIDIsIHRoaXMucHJvakRpc3QsIHRoaXMucHJvakZhckNsaXApO1xyXG4gICAgdGhpcy5tYXRyVlAgPSB0aGlzLm1hdHJWaWV3Lm11bE1hdHIodGhpcy5tYXRyUHJvaik7XHJcbiAgfSAvLyBFbmQgb2YgJ3NldFByb2onIGZ1bmN0aW9uXHJcblxyXG4gIHNldFNpemUoZnJhbWVXLCBmcmFtZUgpXHJcbiAge1xyXG4gICAgdGhpcy5mcmFtZVcgPSBmcmFtZVc7XHJcbiAgICB0aGlzLmZyYW1lSCA9IGZyYW1lSDtcclxuICAgIHRoaXMuc2V0UHJvaih0aGlzLnByb2pTaXplLCB0aGlzLnByb2pEaXN0LCB0aGlzLnByb2pGYXJDbGlwKTtcclxuICB9IC8vIEVuZCBvZiAnc2V0U2l6ZScgZnVuY3Rpb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNhbWVyYSgpe1xyXG4gIHJldHVybiBuZXcgX2NhbWVyYSgpO1xyXG59IiwiaW1wb3J0IHsgY2FtZXJhIH0gZnJvbSBcIi4uL21hdGgvY2FtZXJhLmpzXCI7XHJcbmltcG9ydCB7IG1hdDQgfSBmcm9tIFwiLi4vbWF0aC9tYXQ0LmpzXCI7XHJcbmltcG9ydCB7IHZlYzMgfSBmcm9tIFwiLi4vbWF0aC92ZWMzLmpzXCI7XHJcblxyXG5jbGFzcyBfcmVuZGVyT2JqZWN0IHtcclxuICBnbDtcclxuICBjYW52YXM7XHJcbiAgbWFpbkNhbTtcclxuICBzdGFydFRpbWU7XHJcbiAgdGltZTtcclxuXHJcbiAgcHJpbUxpc3QgPSBbXTtcclxuICBcclxuICBjb25zdHJ1Y3RvciAoY2FudmFzSWQpIHtcclxuICAgIHRoaXMuaW5pdChjYW52YXNJZClcclxuICB9XHJcblxyXG4gIGluaXQgKGNhbnZhc0lkKSB7XHJcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc0lkKTtcclxuICAgIHRoaXMuZ2wgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwid2ViZ2wyXCIpO1xyXG4gICAgdGhpcy5tYWluQ2FtID0gY2FtZXJhKCk7XHJcblxyXG4gICAgdGhpcy5nbC5lbmFibGUodGhpcy5nbC5ERVBUSF9URVNUKTtcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgdGhpcy50aW1lID0gdGhpcy5zdGFydFRpbWUgPSBkYXRlLmdldE1pbnV0ZXMoKSAqIDYwICtcclxuICAgICAgICAgICAgZGF0ZS5nZXRTZWNvbmRzKCkgK1xyXG4gICAgICAgICAgICBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8gMTAwMDtcclxuXHJcbiAgICB0aGlzLmdsLmNsZWFyQ29sb3IoMC4zMCwgMC40NywgMC44LCAxKTtcclxuXHJcbiAgfVxyXG5cclxuICBkcmF3RnJhbWUoKSB7XHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgIHRoaXMudGltZSA9IGRhdGUuZ2V0TWludXRlcygpICogNjAgK1xyXG4gICAgICAgICAgICBkYXRlLmdldFNlY29uZHMoKSArXHJcbiAgICAgICAgICAgIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLyAxMDAwIC0gdGhpcy5zdGFydFRpbWU7XHJcblxyXG4gICAgdGhpcy5nbC5jbGVhcih0aGlzLmdsLkNPTE9SX0JVRkZFUl9CSVQpO1xyXG4gIH1cclxuXHJcbiAgZHJhd1ByaW0ocCkge1xyXG4gICAgcC5wcmltTXRsUHRuLnNoZC5hcHBseSgpO1xyXG5cclxuICAgIC8vbGV0IG1XID0gbWF0NCgpLnJvdGF0ZVkoNDcgKiB0aGlzLnRpbWUpO1xyXG4gICAgbGV0IG1XID0gbWF0NCgpLnJvdGF0ZSg0NyAqIHRoaXMudGltZSwgdmVjMygxLCAxLCAxKS5ub3JtYWxpemUoKSk7XHJcbiAgICBsZXQgbVdWUCA9IG1XLm11bE1hdHIodGhpcy5tYWluQ2FtLm1hdHJWUCk7XHJcbiAgICBsZXQgbVdJbnYgPSBtVy5pbnZlcnNlKCkudHJhbnNwb3NlKCk7XHJcblxyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdICE9IHVuZGVmaW5lZClcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1ZQXCJdLmxvYywgZmFsc2UsIG5ldyBGbG9hdDMyQXJyYXkobVdWUC50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldcIl0gIT0gdW5kZWZpbmVkKSBcclxuICAgICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV1wiXS5sb2MsIGZhbHNlLCBuZXcgRmxvYXQzMkFycmF5KG1XLnRvQXJyYXkoKSkpO1xyXG4gICAgaWYgKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJNYXRyV0ludlwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdihwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiTWF0cldJbnZcIl0ubG9jLCBmYWxzZSwgbmV3IEZsb2F0MzJBcnJheShtV0ludi50b0FycmF5KCkpKTtcclxuICAgIGlmIChwLnByaW1NdGxQdG4uc2hkLnVuaWZvcm1zW1wiVGltZVwiXSAhPSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMuZ2wudW5pZm9ybTFmKHAucHJpbU10bFB0bi5zaGQudW5pZm9ybXNbXCJUaW1lXCJdLmxvYywgdGhpcy50aW1lKTtcclxuXHJcbiAgICB0aGlzLmdsLmJpbmRWZXJ0ZXhBcnJheShwLnZlcnRleEFycmF5KTtcclxuICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkFSUkFZX0JVRkZFUiwgcC52ZXJ0ZXhCdWZmZXIpO1xyXG4gICAgaWYgKHAuaW5kZXhCdWZmZXIgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBwLmluZGV4QnVmZmVyKTtcclxuXHJcbiAgICAgIHRoaXMuZ2wuZHJhd0VsZW1lbnRzKHAudHlwZSwgcC5ub29mSSwgdGhpcy5nbC5VTlNJR05FRF9JTlQsIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nbC5kcmF3QXJyYXlzKHAudHlwZSwgMCwgcC5ub29mVik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyT2JqZWN0KGNhbnZhc0lkKSB7XHJcbiAgcmV0dXJuIG5ldyBfcmVuZGVyT2JqZWN0KGNhbnZhc0lkKTtcclxufSIsIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuY2xhc3MgX3NoYWRlciB7XHJcbiAgZ2xEcmF3aW5nQ29udGV4dDtcclxuICBuYW1lO1xyXG5cclxuICBhc3luYyBjcmVhdGUoKSB7XHJcbiAgICB0aGlzLmlkID0gbnVsbDtcclxuICAgIHRoaXMuc2hhZGVycyA9XHJcbiAgICBbXHJcbiAgICAgICB7XHJcbiAgICAgICAgIGlkOiBudWxsLFxyXG4gICAgICAgICB0eXBlOiB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVkVSVEVYX1NIQURFUixcclxuICAgICAgICAgbmFtZTogXCJ2ZXJ0XCIsXHJcbiAgICAgICAgIHNyYzogXCJcIixcclxuICAgICAgIH0sXHJcbiAgICAgICB7XHJcbiAgICAgICAgaWQ6IG51bGwsXHJcbiAgICAgICAgdHlwZTogdGhpcy5nbERyYXdpbmdDb250ZXh0LkZSQUdNRU5UX1NIQURFUixcclxuICAgICAgICBuYW1lOiBcImZyYWdcIixcclxuICAgICAgICBzcmM6IFwiXCIsXHJcbiAgICAgICB9XHJcbiAgICBdO1xyXG4gICAgZm9yIChjb25zdCBzIG9mIHRoaXMuc2hhZGVycykge1xyXG4gICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgYmluL3NoYWRlcnMvJHt0aGlzLm5hbWV9LyR7cy5uYW1lfS5nbHNsYCk7XHJcbiAgICAgIGxldCBzcmMgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICAgIGlmICh0eXBlb2Ygc3JjID09IFwic3RyaW5nXCIgJiYgc3JjICE9IFwiXCIpXHJcbiAgICAgICAgcy5zcmMgPSBzcmM7XHJcbiAgICB9XHJcbiAgICAvLyByZWNvbXBpbGUgc2hhZGVyc1xyXG4gICAgdGhpcy51cGRhdGVTaGFkZXJzU291cmNlKCk7XHJcbiB9ICBcclxuXHJcbiAgdXBkYXRlU2hhZGVyc1NvdXJjZSgpIHsgXHJcbiAgICB0aGlzLnNoYWRlcnNbMF0uaWQgPSBudWxsO1xyXG4gICAgdGhpcy5zaGFkZXJzWzFdLmlkID0gbnVsbDtcclxuICAgIHRoaXMuaWQgPSBudWxsO1xyXG4gICAgaWYgKHRoaXMuc2hhZGVyc1swXS5zcmMgPT0gXCJcIiB8fCB0aGlzLnNoYWRlcnNbMV0uc3JjID09IFwiXCIpXHJcbiAgICAgIHJldHVybjtcclxuICAgIHRoaXMuc2hhZGVycy5mb3JFYWNoKHMgPT4ge1xyXG4gICAgICBzLmlkID0gdGhpcy5nbERyYXdpbmdDb250ZXh0LmNyZWF0ZVNoYWRlcihzLnR5cGUpO1xyXG4gICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuc2hhZGVyU291cmNlKHMuaWQsIHMuc3JjKTtcclxuICAgICAgdGhpcy5nbERyYXdpbmdDb250ZXh0LmNvbXBpbGVTaGFkZXIocy5pZCk7XHJcbiAgICAgIGlmICghdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFNoYWRlclBhcmFtZXRlcihzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRTaGFkZXJJbmZvTG9nKHMuaWQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGBTaGFkZXIgJHt0aGlzLm5hbWV9LyR7cy5uYW1lfSBjb21waWxlIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIH0pOyAgICAgICAgICAgICBcclxuIFxyXG4gICAgdGhpcy5pZCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5jcmVhdGVQcm9ncmFtKCk7XHJcbiAgICB0aGlzLnNoYWRlcnMuZm9yRWFjaChzID0+IHtcclxuICAgICAgaWYgKHMuaWQgIT0gbnVsbClcclxuICAgICAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQuYXR0YWNoU2hhZGVyKHRoaXMuaWQsIHMuaWQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmdsRHJhd2luZ0NvbnRleHQubGlua1Byb2dyYW0odGhpcy5pZCk7XHJcbiAgICBpZiAoIXRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMuaWQsIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5MSU5LX1NUQVRVUykpIHtcclxuICAgICAgbGV0IGJ1ZiA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRQcm9ncmFtSW5mb0xvZyh0aGlzLmlkKTtcclxuICAgICAgY29uc29sZS5sb2coYFNoYWRlciBwcm9ncmFtICR7dGhpcy5uYW1lfSBsaW5rIGZhaWw6ICR7YnVmfWApO1xyXG4gICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICB0aGlzLnVwZGF0ZVNoYWRlckRhdGEoKTsgICAgXHJcbiAgfVxyXG5cclxuICB1cGRhdGVTaGFkZXJEYXRhKCkge1xyXG4gICAgLy8gU2hhZGVyIGF0dHJpYnV0ZXNcclxuICAgIHRoaXMuYXR0cnMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50QXR0cnMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX0FUVFJJQlVURVMpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudEF0dHJzOyBpKyspIHtcclxuICAgICAgY29uc3QgaW5mbyA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVBdHRyaWIodGhpcy5pZCwgaSk7XHJcbiAgICAgIHRoaXMuYXR0cnNbaW5mby5uYW1lXSA9IHtcclxuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXHJcbiAgICAgICAgdHlwZTogaW5mby50eXBlLFxyXG4gICAgICAgIHNpemU6IGluZm8uc2l6ZSxcclxuICAgICAgICBsb2M6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBdHRyaWJMb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvLyBTaGFkZXIgdW5pZm9ybXNcclxuICAgIHRoaXMudW5pZm9ybXMgPSB7fTtcclxuICAgIGNvbnN0IGNvdW50VW5pZm9ybXMgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1TKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtczsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGluZm8gPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0QWN0aXZlVW5pZm9ybSh0aGlzLmlkLCBpKTtcclxuICAgICAgdGhpcy51bmlmb3Jtc1tpbmZvLm5hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcclxuICAgICAgICB0eXBlOiBpbmZvLnR5cGUsXHJcbiAgICAgICAgc2l6ZTogaW5mby5zaXplLFxyXG4gICAgICAgIGxvYzogdGhpcy5nbERyYXdpbmdDb250ZXh0LmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLmlkLCBpbmZvLm5hbWUpLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNoYWRlciB1bmlmb3JtIGJsb2Nrc1xyXG4gICAgdGhpcy51bmlmb3JtQmxvY2tzID0ge307XHJcbiAgICBjb25zdCBjb3VudFVuaWZvcm1CbG9ja3MgPSB0aGlzLmdsRHJhd2luZ0NvbnRleHQuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLmlkLCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuQUNUSVZFX1VOSUZPUk1fQkxPQ0tTKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnRVbmlmb3JtQmxvY2tzOyBpKyspIHtcclxuICAgICAgY29uc3QgYmxvY2tfbmFtZSA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tOYW1lKHRoaXMuaWQsIGkpO1xyXG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tJbmRleCh0aGlzLmlkLCBibG9ja19uYW1lKTtcclxuICAgICAgdGhpcy51bmlmb3JtQmxvY2tzW2Jsb2NrX25hbWVdID0ge1xyXG4gICAgICAgIG5hbWU6IGJsb2NrX25hbWUsXHJcbiAgICAgICAgaW5kZXg6IGluZGV4LFxyXG4gICAgICAgIHNpemU6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19EQVRBX1NJWkUpLFxyXG4gICAgICAgIGJpbmQ6IHRoaXMuZ2xEcmF3aW5nQ29udGV4dC5nZXRBY3RpdmVVbmlmb3JtQmxvY2tQYXJhbWV0ZXIodGhpcy5pZCwgaWR4LCB0aGlzLmdsRHJhd2luZ0NvbnRleHQuVU5JRk9STV9CTE9DS19CSU5ESU5HKSxcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuIFxyXG4gIGNvbnN0cnVjdG9yKG5hbWUsIHJuZE9iaikge1xyXG4gICAgdGhpcy5nbERyYXdpbmdDb250ZXh0ID0gcm5kT2JqLmdsO1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICB9XHJcbiBcclxuICBhcHBseSgpIHtcclxuICAgIGlmICh0aGlzLmlkICE9IG51bGwpXHJcbiAgICAgIHRoaXMuZ2xEcmF3aW5nQ29udGV4dC51c2VQcm9ncmFtKHRoaXMuaWQpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNoYWRlcihuYW1lLCBybmRPYmopIHtcclxuICByZXR1cm4gbmV3IF9zaGFkZXIobmFtZSwgcm5kT2JqKTtcclxufSIsImltcG9ydCB7IHNoYWRlciB9IGZyb20gXCIuL3NoYWRlcnNcIjtcclxuXHJcbmNsYXNzIF9tYXRlcmlhbFBhdHRlcm4ge1xyXG4gIHNoZDtcclxuICBuYW1lO1xyXG5cclxuICBjb25zdHJ1Y3RvcihuYW1lLCBzaGROYW1lLCBybmRPYmopIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLnNoZCA9IHNoYWRlcihzaGROYW1lLCBybmRPYmopO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1hdGVyaWFsUGF0dGVybihuYW1lLCBzaGROYW1lLCBybmRPYmopIHtcclxuICByZXR1cm4gbmV3IF9tYXRlcmlhbFBhdHRlcm4obmFtZSwgc2hkTmFtZSwgcm5kT2JqKTtcclxufSIsImNsYXNzIF9wcmltIHtcclxuICB2ZXJ0ZXhCdWZmZXI7XHJcbiAgaW5kZXhCdWZmZXI7XHJcbiAgcHJpbU10bFB0bjtcclxuICB2ZXJ0ZXhBcnJheTtcclxuICBub29mViA9IDA7XHJcbiAgbm9vdkkgPSAwO1xyXG4gIHR5cGU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKG10bFB0biwgdHlwZSwgdmVydGV4ZXMsIGluZGV4ZXMpIHtcclxuICAgIGxldCBnbCA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dDtcclxuXHJcbiAgICBpZiAodHlwZSA9PSBcInRyaWFuZ2xlc1wiKVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuVFJJQU5HTEVTO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcInRyaWFuZ2xlIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5UUklBTkdMRV9TVFJJUDtcclxuICAgIGVsc2UgaWYgKHR5cGUgPT0gXCJsaW5lIHN0cmlwXCIpXHJcbiAgICAgIHRoaXMudHlwZSA9IG10bFB0bi5zaGQuZ2xEcmF3aW5nQ29udGV4dC5MSU5FX1NUUklQO1xyXG4gICAgZWxzZSBpZiAodHlwZSA9PSBcInRyaWFuZ2xlIGZ1blwiKVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuVFJJQU5HTEVfRlVOO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnR5cGUgPSBtdGxQdG4uc2hkLmdsRHJhd2luZ0NvbnRleHQuUE9JTlRTO1xyXG5cclxuICAgIGxldCB2ZXJ0Rm9ybWF0ID0gW1xyXG4gICAgICB7bmFtZSA6IFwiUG9zaXRpb25cIixcclxuICAgICAgIHNpemUgOiAxMn0sXHJcbiAgICAgIHtuYW1lIDogXCJOb3JtYWxcIixcclxuICAgICAgIHNpemUgOiAxMn1cclxuICAgICAgXTtcclxuICAgIGxldCB2ZXJ0U2l6ZSA9IDA7XHJcbiAgICBcclxuICAgIHZlcnRGb3JtYXQuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgICB2ZXJ0U2l6ZSArPSBlbGVtLnNpemU7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm5vb2ZWID0gdmVydGV4ZXMubGVuZ3RoIC8gKHZlcnRTaXplIC8gNCk7XHJcblxyXG4gICAgLy8vY29uc29sZS5sb2cobXRsUHRuLnNoZCk7XHJcblxyXG4gICAgLy8gdmVydGV4IGJ1ZmZlclxyXG4gICAgdGhpcy5wcmltTXRsUHRuID0gbXRsUHRuO1xyXG4gICAgdGhpcy52ZXJ0ZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLnZlcnRleEJ1ZmZlcik7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh2ZXJ0ZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAvLyBpbmRleCBidWZmZXJcclxuICAgIGlmIChpbmRleGVzICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICB0aGlzLm5vb2ZJID0gaW5kZXhlcy5sZW5ndGg7XHJcbiAgICAgIHRoaXMuaW5kZXhCdWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5pbmRleEJ1ZmZlcik7XHJcbiAgICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MzJBcnJheShpbmRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHZlcnRleCBhdHRyaWJzXHJcbiAgICB0aGlzLnZlcnRleEFycmF5PSBnbC5jcmVhdGVWZXJ0ZXhBcnJheSgpO1xyXG4gICAgZ2wuYmluZFZlcnRleEFycmF5KHRoaXMudmVydGV4QXJyYXkpO1xyXG5cclxuICAgIGxldCBhbGxTaXplID0gMDtcclxuICAgIGZvciAobGV0IGkgaW4gdmVydEZvcm1hdCkge1xyXG4gICAgICBsZXQgZmluZGVkQXR0ciA9IG10bFB0bi5zaGQuYXR0cnNbXCJJblwiICsgdmVydEZvcm1hdFtpXS5uYW1lXTtcclxuXHJcbiAgICAgIGlmIChmaW5kZWRBdHRyICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCBhdHRyTG9jID0gbXRsUHRuLnNoZC5hdHRyc1tcIkluXCIgKyB2ZXJ0Rm9ybWF0W2ldLm5hbWVdLmxvYztcclxuXHJcbiAgICAgICAgaWYgKGF0dHJMb2MgIT0gLTEpIHtcclxuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoYXR0ckxvYywgdmVydEZvcm1hdFtpXS5zaXplIC8gNCwgZ2wuRkxPQVQsIGZhbHNlLCB2ZXJ0U2l6ZSwgYWxsU2l6ZSk7XHJcbiAgICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShhdHRyTG9jKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFsbFNpemUgKz0gdmVydEZvcm1hdFtpXS5zaXplO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcHJpbShtdGxQdG4sIHR5cGUsIHZlcnRleGVzLCBpbmRleGVzKSB7XHJcbiAgcmV0dXJuIG5ldyBfcHJpbShtdGxQdG4sIHR5cGUsIHZlcnRleGVzLCBpbmRleGVzKTtcclxufVxyXG4iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uLy4uL21hdGgvdmVjMy5qc1wiXHJcblxyXG5jbGFzcyBfdmVydGV4IHtcclxuICBwb3M7XHJcbiAgbm9ybTtcclxuXHJcbiAgY29uc3RydWN0b3IocG9zLCBub3JtKSB7XHJcbiAgICB0aGlzLnBvcyA9IHBvcztcclxuXHJcbiAgICBpZiAobm9ybSA9PSB1bmRlZmluZWQpXHJcbiAgICAgIHRoaXMubm9ybSA9IHZlYzMoMCk7XHJcbiAgICBlbHNlICBcclxuICAgICAgdGhpcy5ub3JtID0gbm9ybTtcclxuICB9XHJcblxyXG4gIHRvQXJyYXkoKSB7XHJcbiAgICByZXR1cm4gW3RoaXMucG9zLngsIHRoaXMucG9zLnksIHRoaXMucG9zLnosIHRoaXMubm9ybS54LCB0aGlzLm5vcm0ueSwgdGhpcy5ub3JtLnpdO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVmVydGV4QXJyYXkoLi4uYXJncykge1xyXG4gICAgbGV0IHZzO1xyXG5cclxuICAgIGlmIChhcmdzLmxlbmd0aCA9PSAxICYmIEFycmF5LmlzQXJyYXkoYXJnc1swXSkpXHJcbiAgICAgIHZzID0gYXJnc1swXTtcclxuICAgIGVsc2VcclxuICAgICAgdnMgPSBhcmdzO1xyXG5cclxuICAgIGxldCB2ID0gW11cclxuXHJcbiAgICB2cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICB2LnB1c2goLi4uZWxlbWVudC50b0FycmF5KCkpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHY7XHJcbiAgfVxyXG5cclxuICBhdXRvTm9ybWFsKHZlcnRleGVzLCBpbmRleGVzKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlYzMoMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGluZGV4ZXMgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmVydGV4ZXMubGVuZ3RoOyApe1xyXG4gICAgICAgIGxldCB2MSA9IHZlcnRleGVzW2kgKyAxXS5wb3Muc3ViVmVjKHZlcnRleGVzW2ldLnBvcyk7XHJcbiAgICAgICAgbGV0IHYyID0gdmVydGV4ZXNbaSArIDJdLnBvcy5zdWJWZWModmVydGV4ZXNbaV0ucG9zKTtcclxuXHJcbiAgICAgICAgbGV0IG4gPSB2MS5jcm9zcyh2Mik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0uYWRkVmVjKG4pO1xyXG4gICAgICAgIHZlcnRleGVzW2kgKyAxXS5ub3JtID0gdmVydGV4ZXNbaSArIDFdLm5vcm0uYWRkVmVjKG4pO1xyXG4gICAgICAgIHZlcnRleGVzW2kgKyAyXS5ub3JtID0gdmVydGV4ZXNbaSArIDJdLm5vcm0uYWRkVmVjKG4pO1xyXG5cclxuICAgICAgICBpICs9IDM7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgaW5kZXhlcy5sZW5ndGg7ICkge1xyXG4gICAgICAgIGlmIChpbmRleGVzW2pdID09IC0xIHx8IGluZGV4ZXNbaiArIDFdID09IC0xIHx8IGluZGV4ZXNbaiArIDJdID09IC0xKSB7XHJcbiAgICAgICAgICBqKys7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB2MSA9IHZlcnRleGVzW2luZGV4ZXNbaiArIDFdXS5wb3Muc3ViVmVjKHZlcnRleGVzW2luZGV4ZXNbal1dLnBvcyk7XHJcbiAgICAgICAgbGV0IHYyID0gdmVydGV4ZXNbaW5kZXhlc1tqICsgMl1dLnBvcy5zdWJWZWModmVydGV4ZXNbaW5kZXhlc1tqXV0ucG9zKTtcclxuXHJcbiAgICAgICAgbGV0IG4gPSB2MS5jcm9zcyh2Mik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdmVydGV4ZXNbaW5kZXhlc1tqXV0ubm9ybSA9IHZlcnRleGVzW2luZGV4ZXNbal1dLm5vcm0uYWRkVmVjKG4pO1xyXG4gICAgICAgIHZlcnRleGVzW2luZGV4ZXNbaiArIDFdXS5ub3JtID0gdmVydGV4ZXNbaW5kZXhlc1tqICsgMV1dLm5vcm0uYWRkVmVjKG4pO1xyXG4gICAgICAgIHZlcnRleGVzW2luZGV4ZXNbaiArIDJdXS5ub3JtID0gdmVydGV4ZXNbaW5kZXhlc1tqICsgMl1dLm5vcm0uYWRkVmVjKG4pO1xyXG5cclxuICAgICAgICBqICs9IDM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZlcnRleGVzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgdmVydGV4ZXNbaV0ubm9ybSA9IHZlcnRleGVzW2ldLm5vcm0ubm9ybWFsaXplKCk7XHJcbiAgICBcclxuICAgIH0gIFxyXG4gICAgcmV0dXJuIHZlcnRleGVzO1xyXG4gIFxyXG4gIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2ZXJ0ZXgocG9zLCBub3JtKSB7XHJcbiAgcmV0dXJuIG5ldyBfdmVydGV4KHBvcywgbm9ybSk7XHJcbn0iLCJpbXBvcnQgeyB2ZWMzIH0gZnJvbSBcIi4uLy4uL21hdGgvdmVjM1wiO1xyXG5pbXBvcnQgeyBwcmltIH0gZnJvbSBcIi4vcHJpbVwiO1xyXG5pbXBvcnQgeyB2ZXJ0ZXggfSBmcm9tIFwiLi92ZXJ0ZXhcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBQbGF0b24ge1xyXG4gIHN0YXRpYyBjdWJlQ3JlYXRlKG10bFB0biwgc2l6ZSkge1xyXG4gICAgbGV0IHBudHMgPSBbXHJcbiAgICAgIHZlYzMoLTEsIC0xLCAtMSksIHZlYzMoMSwgLTEsIC0xKSxcclxuICAgICAgdmVjMygxLCAtMSwgMSksIHZlYzMoLTEsIC0xLCAxKSxcclxuICAgICAgdmVjMygtMSwgMSwgLTEpLCB2ZWMzKDEsIDEsIC0xKSxcclxuICAgICAgdmVjMygxLCAxLCAxKSwgdmVjMygtMSwgMSwgMSksXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBsZXQgaW5kID0gW1xyXG4gICAgICAxLCAwLCAyLCAzLCAtMSxcclxuICAgICAgNSwgNiwgMSwgMiwgLTEsXHJcbiAgICAgIDYsIDcsIDIsIDMsIC0xLFxyXG4gICAgICA3LCA0LCAzLCAwLCAtMSxcclxuICAgICAgNCwgNSwgMCwgMSwgLTEsXHJcbiAgICAgIDQsIDUsIDcsIDYsIC0xLFxyXG4gICAgXTtcclxuICBcclxuICAgIGxldCBub3JtcyA9IFtcclxuICAgICAgdmVjMygwLCAtMSwgMCksIHZlYzMoMSwgMCwgMCksXHJcbiAgICAgIHZlYzMoMCwgMCwgMSksIHZlYzMoLTEsIDAsIDApLFxyXG4gICAgICB2ZWMzKDAsIDAsIC0xKSwgdmVjMygwLCAxLCAwKSxcclxuICAgIF1cclxuICBcclxuICAgIGxldCB2ZXJ0ID0gW107XHJcbiAgXHJcbiAgICBsZXQgdUluZCA9IFtdO1xyXG4gIFxyXG4gICAgbGV0IGogPSAwO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGluZFtpXSAhPSAtMSkge1xyXG4gICAgICAgIHZlcnQucHVzaCh2ZXJ0ZXgocG50c1tpbmRbaV1dLm11bE51bShzaXplKSwgbm9ybXNbTWF0aC5mbG9vcihpIC8gNSldKSk7XHJcbiAgICAgICAgdUluZC5wdXNoKGopO1xyXG4gICAgICAgIGorKztcclxuICAgICAgfVxyXG4gICAgICBlbHNlXHJcbiAgICAgICAgdUluZC5wdXNoKC0xKTtcclxuICAgIH1cclxuICBcclxuICAgIGxldCB2ZXJ0ZXhBcnIgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuICBcclxuICAgIHJldHVybiBwcmltKG10bFB0biwgXCJ0cmlhbmdsZSBzdHJpcFwiLCB2ZXJ0ZXhBcnIsIHVJbmQpO1xyXG4gIH1cclxuICBcclxuICBzdGF0aWMgb2N0Q3JlYXRlKG10bFB0biwgc2l6ZSkge1xyXG4gICAgbGV0IHBudHMgPSBbXHJcbiAgICAgIHZlYzMoMCwgMSwgMCksIHZlYzMoMCwgMCwgMSksXHJcbiAgICAgIHZlYzMoLTEsIDAsIDApLCB2ZWMzKDAsIDAsIC0xKSxcclxuICAgICAgdmVjMygxLCAwLCAwKSwgdmVjMygwLCAtMSwgMCksXHJcbiAgICBdO1xyXG4gICAgXHJcbiAgICBsZXQgaW5kID0gW1xyXG4gICAgICAwLCAxLCAyLFxyXG4gICAgICAwLCAyLCAzLFxyXG4gICAgICAwLCAzLCA0LFxyXG4gICAgICAwLCA0LCAxLFxyXG4gICAgICA1LCAxLCAyLFxyXG4gICAgICA1LCAyLCAzLFxyXG4gICAgICA1LCAzLCA0LFxyXG4gICAgICA1LCA0LCAxLFxyXG4gICAgXTtcclxuICBcclxuICAgIGxldCB2ZXJ0ID0gW107XHJcbiAgXHJcbiAgICBsZXQgdUluZCA9IFtdO1xyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmVydC5wdXNoKHZlcnRleChwbnRzW2luZFtpXV0ubXVsTnVtKHNpemUpKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICB2ZXJ0ID0gdmVydGV4KCkuYXV0b05vcm1hbCh2ZXJ0KTtcclxuICBcclxuICAgIGxldCB2ZXJ0ZXhBcnIgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2ZXJ0KTtcclxuICBcclxuICAgIHJldHVybiBwcmltKG10bFB0biwgXCJ0cmlhbmdsZXNcIiwgdmVydGV4QXJyKTtcclxuICBcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIHRldHJDcmVhdGUobXRsUHRuLCBzaXplKSB7XHJcbiAgICBjb25zdCBzcXJ0MyA9IE1hdGguc3FydCgzKTtcclxuICAgIGNvbnN0IHNxcnQyMyA9IE1hdGguc3FydCgyIC8gMyk7XHJcbiAgXHJcbiAgICBsZXQgdnQgPSBbXHJcbiAgICAgIHZlcnRleCh2ZWMzKDAsIDAsIHNxcnQzIC8gMykpLCB2ZXJ0ZXgodmVjMygwLjUsIDAsIC1zcXJ0MyAvIDYpKSwgdmVydGV4KHZlYzMoLTAuNSwgMCwgLXNxcnQzIC8gNikpLFxyXG4gICAgICB2ZXJ0ZXgodmVjMygwLCBzcXJ0MjMsIDApKSwgdmVydGV4KHZlYzMoMC41LCAwLCAtc3FydDMgLyA2KSksIHZlcnRleCh2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYpKSxcclxuICAgICAgdmVydGV4KHZlYzMoMCwgc3FydDIzLCAwKSksIHZlcnRleCh2ZWMzKDAuNSwgMCwgLXNxcnQzIC8gNikpLCB2ZXJ0ZXgodmVjMygwLCAwLCBzcXJ0MyAvIDMpKSxcclxuICAgICAgdmVydGV4KHZlYzMoMCwgc3FydDIzLCAwKSksIHZlcnRleCh2ZWMzKC0wLjUsIDAsIC1zcXJ0MyAvIDYpKSwgdmVydGV4KHZlYzMoMCwgMCwgc3FydDMgLyAzKSksXHJcbiAgICBdO1xyXG4gIFxyXG4gICAgdnQuZm9yRWFjaCgodmVydCkgPT4ge1xyXG4gICAgICB2ZXJ0LnBvcyA9IHZlcnQucG9zLm11bE51bShzaXplKTtcclxuICAgIH0pXHJcbiAgXHJcbiAgICB2dCA9IHZlcnRleCgpLmF1dG9Ob3JtYWwodnQpO1xyXG4gIFxyXG4gICAgdnQgPSB2ZXJ0ZXgoKS5jcmVhdGVWZXJ0ZXhBcnJheSh2dCk7XHJcbiAgXHJcbiAgICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZ0KTtcclxuICB9XHJcbiAgXHJcbiAgc3RhdGljIGljb0NyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICAgIGNvbnN0IFxyXG4gICAgICBzcXJ0NWQyID0gTWF0aC5zcXJ0KDUpIC8gMixcclxuICAgICAgc2luNzIgPSBNYXRoLnNpbig3MiAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICBjb3M3MiA9IE1hdGguY29zKDcyICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgXHJcbiAgICBsZXQgcG50cyA9IFtcclxuICAgICAgdmVjMygwLCBzcXJ0NWQyLCAwKVxyXG4gICAgXVxyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgcG50cy5wdXNoKHZlYzMoTWF0aC5jb3MoKDcyICogaSkgKiBNYXRoLlBJIC8xODApLCAwLjUsIE1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcclxuICAgICAgcG50cy5wdXNoKHZlYzMoLU1hdGguY29zKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSwgLTAuNSwgLU1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcG50cy5wdXNoKHZlYzMoMCwgLXNxcnQ1ZDIsIDApKTtcclxuICBcclxuICAgIGxldCBpbmQgPSBbXHJcbiAgICAgIDAsIDEsIDIsXHJcbiAgICAgIDAsIDIsIDMsXHJcbiAgICAgIDAsIDMsIDQsXHJcbiAgICAgIDAsIDQsIDUsXHJcbiAgICAgIDAsIDUsIDEsXHJcbiAgICAgIDEsIDksIDgsIFxyXG4gICAgICAxLCAyLCA5LFxyXG4gICAgICAyLCAxMCwgOSxcclxuICAgICAgMiwgMywgMTAsXHJcbiAgICAgIDMsIDYsIDEwLFxyXG4gICAgICAzLCA0LCA2LFxyXG4gICAgICA0LCA3LCA2LFxyXG4gICAgICA0LCA1LCA3LFxyXG4gICAgICA1LCA4LCA3LFxyXG4gICAgICA1LCAxLCA4LFxyXG4gICAgICAxMSwgNiwgNyxcclxuICAgICAgMTEsIDcsIDgsXHJcbiAgICAgIDExLCA4LCA5LFxyXG4gICAgICAxMSwgOSwgMTAsXHJcbiAgICAgIDExLCAxMCwgNixcclxuICAgIF07XHJcbiAgXHJcbiAgICBsZXQgdmVydCA9IFtdO1xyXG4gIFxyXG4gICAgZm9yIChsZXQgaSBpbiBpbmQpIHtcclxuICAgICAgdmVydC5wdXNoKHZlcnRleChwbnRzW2luZFtpXV0ubXVsTnVtKHNpemUpKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICB2ZXJ0ZXgoKS5hdXRvTm9ybWFsKHZlcnQpO1xyXG4gICAgXHJcbiAgICBsZXQgdmVydGV4QXJyID0gdmVydGV4KCkuY3JlYXRlVmVydGV4QXJyYXkodmVydCk7XHJcbiAgXHJcbiAgICByZXR1cm4gcHJpbShtdGxQdG4sIFwidHJpYW5nbGVzXCIsIHZlcnRleEFycik7XHJcbiAgfVxyXG4gIFxyXG4gIHN0YXRpYyBkb2RlY0NyZWF0ZShtdGxQdG4sIHNpemUpIHtcclxuICAgIGNvbnN0IFxyXG4gICAgICBzcXJ0NWQyID0gTWF0aC5zcXJ0KDUpIC8gMixcclxuICAgICAgc2luNzIgPSBNYXRoLnNpbig3MiAqIE1hdGguUEkgLyAxODApLFxyXG4gICAgICBjb3M3MiA9IE1hdGguY29zKDcyICogTWF0aC5QSSAvIDE4MCk7XHJcbiAgXHJcbiAgICBsZXQgcG50czAgPSBbXHJcbiAgICAgIHZlYzMoMCwgc3FydDVkMiwgMClcclxuICAgIF1cclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XHJcbiAgICAgIHBudHMwLnB1c2godmVjMyhNYXRoLmNvcygoNzIgKiBpKSAqIE1hdGguUEkgLzE4MCksIDAuNSwgTWF0aC5zaW4oKDcyICogaSkgKiBNYXRoLlBJIC8xODApKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xyXG4gICAgICBwbnRzMC5wdXNoKHZlYzMoLU1hdGguY29zKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSwgLTAuNSwgLU1hdGguc2luKCg3MiAqIGkpICogTWF0aC5QSSAvMTgwKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgcG50czAucHVzaCh2ZWMzKDAsIC1zcXJ0NWQyLCAwKSk7XHJcbiAgXHJcbiAgICBsZXQgaW5kID0gW1xyXG4gICAgICAwLCAxLCAyLFxyXG4gICAgICAwLCAyLCAzLFxyXG4gICAgICAwLCAzLCA0LFxyXG4gICAgICAwLCA0LCA1LFxyXG4gICAgICAwLCA1LCAxLFxyXG4gICAgICAxLCA5LCA4LCBcclxuICAgICAgMSwgMiwgOSxcclxuICAgICAgMiwgMTAsIDksXHJcbiAgICAgIDIsIDMsIDEwLFxyXG4gICAgICAzLCA2LCAxMCxcclxuICAgICAgMywgNCwgNixcclxuICAgICAgNCwgNywgNixcclxuICAgICAgNCwgNSwgNyxcclxuICAgICAgNSwgOCwgNyxcclxuICAgICAgNSwgMSwgOCxcclxuICAgICAgMTEsIDYsIDcsXHJcbiAgICAgIDExLCA3LCA4LFxyXG4gICAgICAxMSwgOCwgOSxcclxuICAgICAgMTEsIDksIDEwLFxyXG4gICAgICAxMSwgMTAsIDYsXHJcbiAgICBdO1xyXG4gIFxyXG4gICAgbGV0IHBudHMxID0gW107XHJcbiAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluZC5sZW5ndGg7IGkgKz0gMykge1xyXG4gICAgICBwbnRzMS5wdXNoKHBudHMwW2luZFtpXV0uYWRkVmVjKHBudHMwW2luZFtpICsgMV1dKS5hZGRWZWMocG50czBbaW5kW2kgKyAyXV0pLmRpdk51bSgzKSk7XHJcbiAgICB9XHJcbiAgXHJcbiAgICBsZXQgaW5kZXhlcyA9IFtcclxuICAgICAgMCwgMSwgMiwgMCwgMiwgMywgMCwgMywgNCxcclxuICAgICAgMCwgMSwgOCwgMCwgOCwgNywgMCwgNywgNixcclxuICAgICAgMSwgMiwgMTAsIDEsIDEwLCA5LCAxLCA5LCA4LFxyXG4gICAgICAyLCAzLCAxMiwgMiwgMTIsIDExLCAyLCAxMSwgMTAsXHJcbiAgICAgIDMsIDQsIDE0LCAzLCAxNCwgMTMsIDMsIDEzLCAxMixcclxuICAgICAgNCwgMCwgNiwgNCwgNiwgNSwgNCwgNSwgMTQsXHJcbiAgICAgIDcsIDgsIDksIDcsIDksIDE5LCA3LCAxOSwgMTgsXHJcbiAgICAgIDksIDEwLCAxMSwgOSwgMTEsIDE1LCA5LCAxNSwgMTksXHJcbiAgICAgIDExLCAxMiwgMTMsIDExLCAxMywgMTYsIDExLCAxNiwgMTUsXHJcbiAgICAgIDEzLCAxNCwgNSwgMTMsIDUsIDE3LCAxMywgMTcsIDE2LFxyXG4gICAgICA1LCA2LCA3LCA1LCA3LCAxOCwgNSwgMTgsIDE3LFxyXG4gICAgICAxNSwgMTYsIDE3LCAxNSwgMTcsIDE4LCAxNSwgMTgsIDE5LFxyXG4gICAgXVxyXG4gIFxyXG4gICAgbGV0IHZlcnQgPSBbXTtcclxuICBcclxuICAgIGZvciAobGV0IGkgaW4gaW5kZXhlcykge1xyXG4gICAgICB2ZXJ0LnB1c2godmVydGV4KHBudHMxW2luZGV4ZXNbaV1dLm11bE51bShzaXplKSkpO1xyXG4gICAgfVxyXG4gIFxyXG4gICAgdmVydGV4KCkuYXV0b05vcm1hbCh2ZXJ0KTtcclxuICAgIFxyXG4gICAgbGV0IHZlcnRleEFyciA9IHZlcnRleCgpLmNyZWF0ZVZlcnRleEFycmF5KHZlcnQpO1xyXG4gIFxyXG4gICAgcmV0dXJuIHByaW0obXRsUHRuLCBcInRyaWFuZ2xlc1wiLCB2ZXJ0ZXhBcnIpO1xyXG4gIH1cclxufSIsImltcG9ydCB7IHJlbmRlck9iamVjdCB9IGZyb20gXCIuL3JlbmRlci9yZW5kX2RlZi5qc1wiO1xyXG5pbXBvcnQgeyBtYXRlcmlhbFBhdHRlcm4gfSBmcm9tIFwiLi9yZW5kZXIvcmVzL21hdGVyaWFsX3BhdHRlcm4uanNcIjtcclxuaW1wb3J0IHsgcHJpbSB9IGZyb20gXCIuL3JlbmRlci9yZXMvcHJpbS5qc1wiO1xyXG5pbXBvcnQgeyBzaGFkZXIgfSBmcm9tIFwiLi9yZW5kZXIvcmVzL3NoYWRlcnMuanNcIjtcclxuaW1wb3J0IHsgdmVjMyB9IGZyb20gXCIuL21hdGgvdmVjMy5qc1wiO1xyXG5pbXBvcnQgeyBQbGF0b24gfSBmcm9tIFwiLi9yZW5kZXIvcmVzL2ZpZ3VyZXMuanNcIjtcclxuXHJcbmZ1bmN0aW9uIG1haW4oKSB7XHJcbiAgbGV0IFxyXG4gICAgdGV0clJuZCxcclxuICAgIGN1YmVSbmQsXHJcbiAgICBvY3RSbmQsXHJcbiAgICBkb2RlY1JuZCxcclxuICAgIGljb1JuZDtcclxuICBcclxuICBsZXQgXHJcbiAgICB0ZXRyTXRsUHRuLFxyXG4gICAgY3ViZU10bFB0bixcclxuICAgIG9jdE10bFB0bixcclxuICAgIGRvZGVjTXRsUHRuLFxyXG4gICAgaWNvTXRsUHRuO1xyXG4gIFxyXG4gIGxldCBcclxuICAgIHRldHJQcmltLFxyXG4gICAgY3ViZVByaW0sXHJcbiAgICBvY3RQcmltLFxyXG4gICAgZG9kZWNQcmltLFxyXG4gICAgaWNvUHJpbTtcclxuXHJcbiAgdGV0clJuZCA9IHJlbmRlck9iamVjdChcImNhbjBcIik7XHJcbiAgY3ViZVJuZCA9IHJlbmRlck9iamVjdChcImNhbjFcIik7XHJcbiAgb2N0Um5kID0gcmVuZGVyT2JqZWN0KFwiY2FuMlwiKTtcclxuICBkb2RlY1JuZCA9IHJlbmRlck9iamVjdChcImNhbjNcIik7XHJcbiAgaWNvUm5kID0gcmVuZGVyT2JqZWN0KFwiY2FuNFwiKTtcclxuIFxyXG4gIFxyXG4gIHRldHJSbmQubWFpbkNhbS5zZXQodmVjMygwLCAwLCAzKSwgdmVjMygwLCAwLCAwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgdGV0clJuZC5tYWluQ2FtLnNldFNpemUoMTAwMCwgMTAwMCk7XHJcbiAgY3ViZVJuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBjdWJlUm5kLm1haW5DYW0uc2V0U2l6ZSgxMDAwLCAxMDAwKTtcclxuICBvY3RSbmQubWFpbkNhbS5zZXQodmVjMygwLCAwLCAzKSwgdmVjMygwLCAwLCAwKSwgdmVjMygwLCAxLCAwKSk7XHJcbiAgb2N0Um5kLm1haW5DYW0uc2V0U2l6ZSgxMDAwLCAxMDAwKTtcclxuICBkb2RlY1JuZC5tYWluQ2FtLnNldCh2ZWMzKDAsIDAsIDMpLCB2ZWMzKDAsIDAsIDApLCB2ZWMzKDAsIDEsIDApKTtcclxuICBkb2RlY1JuZC5tYWluQ2FtLnNldFNpemUoMTAwMCwgMTAwMCk7XHJcbiAgaWNvUm5kLm1haW5DYW0uc2V0KHZlYzMoMCwgMCwgMyksIHZlYzMoMCwgMCwgMCksIHZlYzMoMCwgMSwgMCkpO1xyXG4gIGljb1JuZC5tYWluQ2FtLnNldFNpemUoMTAwMCwgMTAwMCk7XHJcblxyXG4gIHRldHJNdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJ0ZXRyXCIsIFwiZGVmYXVsdFwiLCB0ZXRyUm5kKTtcclxuICBjdWJlTXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwiY3ViZVwiLCBcImRlZmF1bHRcIiwgY3ViZVJuZCk7XHJcbiAgb2N0TXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwib2N0XCIsIFwiZGVmYXVsdFwiLCBvY3RSbmQpO1xyXG4gIGRvZGVjTXRsUHRuID0gbWF0ZXJpYWxQYXR0ZXJuKFwiZG9kZWNcIiwgXCJkZWZhdWx0XCIsIGRvZGVjUm5kKTtcclxuICBpY29NdGxQdG4gPSBtYXRlcmlhbFBhdHRlcm4oXCJpY29cIiwgXCJkZWZhdWx0XCIsIGljb1JuZCk7XHJcblxyXG4gIGNvbnN0IGRyYXcgPSAoKSA9PiB7XHJcbiAgICAvLyBkcmF3aW5nXHJcbiAgICB0ZXRyUm5kLmRyYXdGcmFtZSgpO1xyXG4gICAgY3ViZVJuZC5kcmF3RnJhbWUoKTtcclxuICAgIG9jdFJuZC5kcmF3RnJhbWUoKTtcclxuICAgIGRvZGVjUm5kLmRyYXdGcmFtZSgpO1xyXG4gICAgaWNvUm5kLmRyYXdGcmFtZSgpO1xyXG5cclxuICAgIHRldHJSbmQuZHJhd1ByaW0odGV0clByaW0pO1xyXG4gICAgY3ViZVJuZC5kcmF3UHJpbShjdWJlUHJpbSk7XHJcbiAgICBvY3RSbmQuZHJhd1ByaW0ob2N0UHJpbSk7XHJcbiAgICBkb2RlY1JuZC5kcmF3UHJpbShkb2RlY1ByaW0pO1xyXG4gICAgaWNvUm5kLmRyYXdQcmltKGljb1ByaW0pO1xyXG4gICAgLy8gYW5pbWF0aW9uIHJlZ2lzdGVyXHJcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xyXG4gICAgfTtcclxuXHJcbiAgdGV0ck10bFB0bi5zaGQuY3JlYXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICB0ZXRyUHJpbSA9IFBsYXRvbi50ZXRyQ3JlYXRlKHRldHJNdGxQdG4sIDEpO1xyXG4gICAgY3ViZU10bFB0bi5zaGQuY3JlYXRlKCkudGhlbigoKSA9PiB7XHJcbiAgICAgIGN1YmVQcmltID0gUGxhdG9uLmN1YmVDcmVhdGUoY3ViZU10bFB0biwgMC41KTtcclxuICAgICAgb2N0TXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICBvY3RQcmltID0gUGxhdG9uLm9jdENyZWF0ZShvY3RNdGxQdG4sIDEpO1xyXG4gICAgICAgIGRvZGVjTXRsUHRuLnNoZC5jcmVhdGUoKS50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGRvZGVjUHJpbSA9IFBsYXRvbi5kb2RlY0NyZWF0ZShkb2RlY010bFB0biwgMSk7XHJcbiAgICAgICAgICBpY29NdGxQdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICBpY29QcmltID0gUGxhdG9uLmljb0NyZWF0ZShpY29NdGxQdG4sIDEpO1xyXG5cclxuICAgICAgICAgICAgZHJhdygpO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICB9KVxyXG4gICAgfSlcclxuICB9XHJcbiAgKVxyXG5cclxuICBmc3RNdGxQdG4uc2hkLmNyZWF0ZSgpLnRoZW4oKCkgPT4ge2ZzdFByaW0gPSBQbGF0b24uY3ViZUNyZWF0ZShmc3RNdGxQdG4sIDAuNSk7fSkudGhlbigoKSA9PiB7XHJcbiAgICBkcmF3KCk7fSk7XHJcbn0gXHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgKCkgPT4ge1xyXG4gIG1haW4oKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7RUFBQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsQ0FBQztFQUNILEVBQUU7RUFDRixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hCLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEIsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hCLEdBQUcsQ0FBQztFQUNKO0VBQ0EsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDdkIsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUTtFQUNwRixNQUFNLElBQUksQ0FBQyxDQUFDO0VBQ1osTUFBTTtFQUNOLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEQsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4RCxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDNUQsT0FBTyxDQUFDO0VBQ1I7RUFDQTtFQUNBO0VBQ0EsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RGLE1BQU0sSUFBSSxDQUFDLENBQUM7RUFDWixNQUFNO0VBQ04sUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDNUUsT0FBTyxDQUFDO0VBQ1IsU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7RUFDbkYsTUFBTSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRTtFQUNoQyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2xDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkMsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtFQUMzRCxNQUFNLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2hDLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDbEMsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsRUFBRTtFQUNsQyxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2xDLFVBQVUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDcEMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQzNDLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsRUFBRTtFQUMvRCxRQUFRLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQ2xDLFVBQVUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7RUFDcEMsWUFBWSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNuQyxLQUFLO0VBQ0wsR0FBRztBQUNIO0VBQ0EsRUFBRSxXQUFXLEdBQUc7RUFDaEIsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUNWLElBQUk7RUFDSixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsUUFBUSxHQUFHO0VBQ2IsSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFLENBQUM7RUFDdkIsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLEdBQUc7RUFDWCxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pGLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakYsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRix3Q0FBd0MsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLHdDQUF3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEYsd0NBQXdDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbEYsR0FBRztBQUNIO0VBQ0EsRUFBRSxZQUFZLENBQUMsQ0FBQyxFQUFFO0VBQ2xCLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4QixLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUU7RUFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVCLGdCQUFnQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUM1QixnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDNUIsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNwQyxHQUFHO0FBQ0g7RUFDQSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0VBQ1gsRUFBRTtFQUNGLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDbkI7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM5RixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvQjtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0I7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlGLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CO0VBQ0EsSUFBSSxPQUFPLENBQUMsQ0FBQztFQUNiLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUM1QjtFQUNBLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztFQUNoQixNQUFNLE9BQU87QUFDYjtFQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7QUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksT0FBTyxDQUFDLENBQUM7RUFDYixHQUFHO0FBQ0g7RUFDQSxFQUFFLFVBQVUsR0FBRztFQUNmLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7RUFDbkIsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDNUI7RUFDQSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7RUFDaEIsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDekI7RUFDQTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtFQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDYixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyRTtBQUNBO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0VBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNiLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzdELHFCQUFxQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JFO0FBQ0E7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2IsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDN0QscUJBQXFCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM3RCxxQkFBcUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckU7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0VBQzlCLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7RUFDakMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDakMsR0FBRztBQUNIO0VBQ0EsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRTtFQUNuQixJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRTtFQUNBLElBQUksT0FBTyxJQUFJO0VBQ2YsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUNoRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0VBQ2hHLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDaEcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNwQixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFO0VBQ3RCLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BFO0VBQ0EsSUFBSSxJQUFJLENBQUMsQ0FBQztFQUNWLElBQUk7RUFDSixNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoRyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2xCLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO0VBQ3JCLElBQUk7RUFDSixNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRTtFQUN0QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRTtFQUN4QyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0VBQ3hDO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDeEMsaUJBQWlCLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztFQUN6QyxpQkFBaUIsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0VBQ3pDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDakUsR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUU7RUFDeEIsSUFBSTtFQUNKLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFO0VBQ3RDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFO0VBQ3hDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDeEM7RUFDQSxJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ2hDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQ3RELEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFO0VBQy9DLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDcEQsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ3JELGlCQUFpQixDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3hILGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNoRSxHQUFHO0FBQ0g7RUFDQSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtFQUNsRCxJQUFJLElBQUksQ0FBQyxDQUFDO0VBQ1YsSUFBSTtFQUNKLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxLQUFLLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzVDLE1BQU0sQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLE1BQU0sS0FBSyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLEtBQUssR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDaEgsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNyRCxLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLFNBQVMsR0FBRztFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdEUsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUM1RCxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVELE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELEdBQUc7QUFDSDtFQUNBLEVBQUUsWUFBWSxHQUFHO0VBQ2pCLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUQsS0FBSyxDQUFDO0VBQ04sR0FBRztBQUNIO0VBQ0EsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFO0VBQ3pCLElBQUksSUFBSSxDQUFDLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxFQUFF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QUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQzVCLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUM1QixnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7RUFDNUIsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQzVCLEdBQUc7QUFDSDtFQUNBLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtFQUNkLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQixLQUFLLENBQUM7RUFDTixHQUFHO0FBQ0g7RUFDQSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUc7RUFDM0MsRUFBRTtFQUNGLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDM0MsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQzNDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0VBQzFDLGdCQUFnQixFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNySCxHQUFHO0FBQ0g7RUFDQSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUc7RUFDOUMsRUFBRTtFQUNGLElBQUksSUFBSSxDQUFDLENBQUM7RUFDVixJQUFJO0VBQ0osTUFBTSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDbkMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNsQyxNQUFNLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzNHLEtBQUssQ0FBQztFQUNOLEdBQUc7QUFDSDtFQUNBLEVBQUUsT0FBTyxHQUFHO0VBQ1osSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDaEMsR0FBRztFQUNILENBQUM7QUFDRDtFQUNPLFNBQVMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO0VBQzlCLEVBQUUsT0FBTyxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0VBQzVCLENBQUM7QUFDRDtFQUNBLFNBQVMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRztFQUNwQyx1QkFBdUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHO0VBQ3BDLHVCQUF1QixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtFQUN0QyxFQUFFLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHO0VBQzVELFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7RUFDN0Q7O0VDemhCQSxNQUFNLEtBQUssQ0FBQztFQUNaLEVBQUUsQ0FBQyxDQUFDO0VBQ0osRUFBRSxDQUFDLENBQUM7RUFDSixFQUFFLENBQUMsQ0FBQztBQUNKO0VBQ0EsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLEVBQUU7RUFDdkIsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztFQUN6QixNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNELFNBQVMsSUFBSSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUU7RUFDekMsTUFBTSxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNqRSxLQUFLLE1BQU07RUFDWCxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzNELEtBQUs7RUFDTCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztFQUMxRCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNkLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNoRSxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUMzQyxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRTtFQUNYLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUM1RCxHQUFHO0FBQ0g7RUFDQTtFQUNBLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRTtFQUNiLElBQUksT0FBTyxJQUFJO0VBQ2YsTUFBTSxJQUFJLENB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Q0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckY7RUFDQSxJQUFJLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0VBQzlGLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztFQUNoRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0VBQ2xHLEdBQUc7QUFDSDtFQUNBLEVBQUUsY0FBYyxDQUFDLENBQUM7RUFDbEIsRUFBRTtFQUNGLElBQUksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDeEYsY0FBYyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RixjQUFjLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFD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LEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0VBQ3BILElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksU0FBUztFQUN0RCxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFFO0VBQ0EsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7RUFDM0MsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7RUFDN0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxXQUFXLElBQUksU0FBUyxFQUFFO0VBQ3BDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdEU7RUFDQSxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztFQUNyRSxLQUFLLE1BQU07RUFDWCxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUM3QyxLQUFLO0VBQ0wsR0FBRztFQUNILENBQUM7QUFD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O0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzdCO0VBQ0EsUUFBUSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3RELFFBQVEsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzlELFFBQVEsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlEO0VBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2YsT0FBTztFQUNQLEtBQUssTUFBTTtFQUNYLE1BQU0sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUk7RUFDNUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7RUFDOUUsVUFBVSxDQUFDLEVBQUUsQ0FBQztFQUNkLFVBQVUsU0FBUztFQUNuQixTQUFTO0FBQ1Q7RUFDQSxRQUFRLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDL0UsUUFBUSxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9FO0VBQ0EsUUFBUSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBQzdCO0VBQ0EsUUFBUSxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hFLFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2hGLFFBQVEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hGO0VBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ2YsT0FBTztFQUNQLEtBQUs7QUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDN0MsTUFBTSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7RUFDdEQ7RUFDQSxLQUFLO0VBQ0wsSUFBSSxPQUFPLFFBQVEsQ0FBQztFQUNwQjtFQUNBLEdBQUc7QUFDSDtFQUNBLENBQUM7QUFDRDtFQUNPLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7RUFDbEMsRUFBRSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNoQzs7RUNsRk8sTUFBTSxNQUFNLENBQUM7RUFDcEIsRUFBRSxPQUFPLFVBQVUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFO0VBQ2xDLElBQUksSUFBSSxJQUFJLEdBQUc7RUFDZixNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDdkMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7RUFDckMsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUNuQyxLQUFLLENBQUM7RUFDTjtFQUNBLElBQUksSUFBSSxHQUFHLEdBQUc7RUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDcEIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVB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QUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFHbEI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ3pDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JDO0VBQ0EsSUFBSSxJQUFJLFNBQVMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUNyRDtFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQztFQUNoRDtFQUNBLEdBQUc7RUFDSDtFQUNBLEVBQUUsT0FBTyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUNsQyxJQUFJLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDL0IsSUFBSSxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNwQztFQUNBLElBQUksSUFBSSxFQUFFLEdBQUc7RUFDYixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUN4RyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNqRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztFQUNsRyxLQUFLLENBQUM7RUFDTjtFQUNBLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksS0FBSztFQUN6QixNQUFNLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDdkMsS0FBSyxFQUFDO0VBQ047RUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7RUFDakM7RUFDQSxJQUFJLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUN4QztFQUNBLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztFQUN6QyxHQUFHO0VBQ0g7RUFDQSxFQUFFLE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7RUFDakMsSUFDSyxNQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUVVO0VBQzNDO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRztFQUNmLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQ3pCLE1BQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2pHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BHLEtBQUs7RUFDTDtFQUNBLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEM7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNkLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNmLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7RUFDbEI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO0VBQ3ZCLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDbkQsS0FBSztFQUNMO0VBQ0EsSUFBSSxNQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDOUI7RUFDQSxJQUFJLElBQUksU0FBUyxHQUFHLE1BQU0sRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0VBQ3JEO0VBQ0EsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0VBQ2hELEdBQUc7RUFDSDtFQUNBLEVBQUUsT0FBTyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtFQUNuQyxJQUNLLE1BQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBRVU7RUFDM0M7RUFDQSxJQUFJLElBQUksS0FBSyxHQUFHO0VBQ2hCLE1BQU0sSUFBSSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0VBQ3pCLE1BQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3JHLEtBQUs7RUFDTDtFQUNBLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckM7RUFDQSxJQUFJLElBQUksR0FBRyxHQUFHO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNkLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0VBQ2QsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZCxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDYixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNiLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2IsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7RUFDZCxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNkLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDO0VBQ2QsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUU7RUFDZixNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNmLEtBQUssQ0FBQztFQUNOO0VBQ0EsSUFBSSxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7RUFDbkI7RUFDQSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7RUFDNUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUYsS0FBSztFQUNMO0VBQ0EsSUFBSSxJQUFJLE9BQU8sR0FBRztFQUNsQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUMvQixNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztFQUNqQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNwQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtFQUNoQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRTtFQUNsQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFB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LEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0VBQ3RDLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUNsRSxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztFQUNyQyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDcEUsRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDdkMsRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ2xFLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDO0VBQ0EsRUFBRSxVQUFVLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7RUFDM0QsRUFBRSxVQUFVLEdBQUcsZUFBZSxD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
