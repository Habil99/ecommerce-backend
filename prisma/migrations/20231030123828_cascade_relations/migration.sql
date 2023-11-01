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

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_products" ADD CONSTRAINT "colors_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_products" ADD CONSTRAINT "colors_on_products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes_on_products" ADD CONSTRAINT "sizes_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sizes_on_products" ADD CONSTRAINT "sizes_on_products_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "colors_on_sizes_on_products" ADD CONSTRAINT "colors_on_sizes_on_products_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
