const { Router } = require("express");
const router = Router();

const {
  showRecipes,
  createRecipe,
  updateRecipe,
  showDashboard,
} = require("../controllers/recipe.controller");

router.get("/recipes/:detail", showRecipes);
router.post("/recipes", createRecipe);
router.put("/recipes/:idrecipe", updateRecipe);

// DASHBOARD
router.get("/dashboard/:company", showDashboard);

module.exports = router;
