# == Schema Information
#
# Table name: adventure_saves
#
#  id           :integer          not null, primary key
#  adventure_id :integer          not null
#  user_id      :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class AdventureSafe < ActiveRecord::Base
end
