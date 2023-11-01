/*
  Warnings:

  - You are about to drop the `colors_on_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sizes_on_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "colors_on_products" DROP CONSTRAINT "colors_on_products_color_id_fkey";

-- DropForeignKey
ALTER TABLE "colors_on_products" DROP CONSTRAINT "colors_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "colors_on_sizes_on_products" DROP CONSTRAINT "colors_on_sizes_on_products_color_id_fkey";

-- DropForeignKey
ALTER TABLE "colors_on_sizes_on_products" DROP CONSTRAINT "colors_on_sizes_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "colors_on_sizes_on_products" DROP CONSTRAINT "colors_on_sizes_on_products_size_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_store_id_fkey";

-- DropForeignKey
ALTER TABLE "sizes_on_products" DROP CONSTRAINT "sizes_on_products_product_id_fkey";

-- DropForeignKey
ALTER TABLE "sizes_on_products" DROP CONSTRAINT "sizes_on_products_size_id_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_user_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "stock_quantity" INTEGER DEFAULT 1;

-- DropTable
DROP TABLE "colors_on_products";

-- DropTable
DROP TABLE "sizes_on_products";

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
