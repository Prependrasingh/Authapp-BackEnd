// auth , isStudent , isAdmin

const jwt = require("jsonwebtoken");
// const express = require("express");
require("dotenv").config();


exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies?.PrependraCookie ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({
        success: false,
        message: "Token not found",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while verifying token",
    });
  }
};

// isStudent middleware

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({
        success: false,
        message: "Only for Students",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR",
    });
  }
};
// isAdmin middlware

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "ERROR",
    });
  }
};
