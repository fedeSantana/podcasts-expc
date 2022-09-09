<?php
/**
 * Plugin Name:    Podcasts - ExpC
 * Description:    Muestra toda la pagina de Podcasts
 * Version:        0.0.1
 * Author:         Fede y santi
 * License:        GPL v3
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *

*/
// First register resources with init 
function podcastsExpC_init() {
    $path = "/frontend/dist/assets";
    if(getenv('WP_ENV')=="development") {
        $path = "/frontend/dist/assets";
    }
    wp_register_script("podcastsExpC_js", plugins_url($path."/index_podcasts.js", __FILE__), array(), "1.0", false);
    wp_register_style("podcastsExpC_css", plugins_url($path."/index_podcasts.css", __FILE__), array(), "1.0", "all");
}

add_action( 'init', 'podcastsExpC_init' );

// Function for the short code that call React app
function podcastsExpC() {
    wp_enqueue_script("podcastsExpC_js", '1.0', true);
    wp_enqueue_style("podcastsExpC_css");
    return "<div id=\"podcastsExpC\"></div>";
}

add_shortcode('podcastsExpC', 'podcastsExpC');
