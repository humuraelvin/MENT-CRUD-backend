import express from "express";
import { Employee } from "../db/models/EmployeeModel";

class EmployeeController {
  getAllEmployee = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const employees = await Employee.find();
      return response.status(200).json({ data: employees });
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };

  getEmployee = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { id } = request.params;
      const employee = await Employee.findById(id);
      if (!employee) {
        return response.status(404).json({ message: "Employee not found" });
      }
      return response.status(200).json({ data: employee });
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };

  createEmployee = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { name, email, mobile, dob, doj } = request.body;
      const employee = new Employee({
        name,
        email,
        mobile,
        dob,
        doj,
      });
      await employee.save();
      return response
        .status(201)
        .json({
          message: "Employee created and saved successfully",
          data: employee,
        });
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };

  updateEmployee = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { id } = request.params;
      const { name, email, mobile, dob, doj } = request.body;
      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          email,
          mobile,
          dob,
          doj,
        },
        { new: true }
      );
      if (!employee) {
        return response.status(404).json({ message: "Employee not found" });
      }
      return response
        .status(200)
        .json({ message: "Employee updated successfully", data: employee });
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };

  deleteEmployee = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { id } = request.params;
      const employee = await Employee.findByIdAndDelete(id);
      if (!employee) {
        return response.status(404).json({ message: "Employee not found" });
      }
      return response
        .status(200)
        .json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  };
}

export default new EmployeeController();
