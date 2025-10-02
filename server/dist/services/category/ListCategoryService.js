"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoryService = void 0;
const mongoose_1 = require("mongoose");
const CategoryModel_1 = require("../../models/CategoryModel");
const PlanModel_1 = require("../../models/PlanModel");
const ApiError_1 = require("../../utils/ApiError");
class ListCategoryService {
    static execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ planId }) {
            const query = {};
            if (planId && mongoose_1.Types.ObjectId.isValid(planId)) {
                const plan = yield PlanModel_1.Plan.findById(planId);
                if (!plan)
                    throw new ApiError_1.ApiError('Nenhum plano de assinatura foi encontrado.');
                if (!plan.fullaccess) {
                    query['$or'] = [
                        { plan: null },
                        { plan: new mongoose_1.Types.ObjectId(plan.id) },
                    ];
                }
            }
            const categories = yield CategoryModel_1.Category.find(query);
            return categories;
        });
    }
}
exports.ListCategoryService = ListCategoryService;
